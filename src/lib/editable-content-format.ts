import type { Experience } from "@/data/experiences";
import { mediaLibrary } from "@/data/mediaLibrary";
import type { Partner } from "@/data/partners";
import type { TeamSection } from "@/data/team";

export type EditableContentState = {
  experiences: Experience[];
  partners: Partner[];
  teamSections: TeamSection[];
};

export type PortableEditableContentState = EditableContentState;

export type EditableContentExportFile = {
  version: 1;
  exportedAt: string;
  content: PortableEditableContentState;
};

const MEDIA_PREFIX = "media:";

const mediaIdBySrc = new Map(mediaLibrary.map((item) => [item.src, item.id]));
const mediaSrcById = new Map(mediaLibrary.map((item) => [item.id, item.src]));

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const toPortableMediaValue = (value: string | undefined) => {
  if (!value) {
    return value ?? "";
  }

  const mediaId = mediaIdBySrc.get(value);
  return mediaId ? `${MEDIA_PREFIX}${mediaId}` : value;
};

const fromPortableMediaValue = (value: string | undefined) => {
  if (!value) {
    return value ?? "";
  }

  if (!value.startsWith(MEDIA_PREFIX)) {
    return value;
  }

  const mediaId = value.slice(MEDIA_PREFIX.length);
  return mediaSrcById.get(mediaId) ?? value;
};

export const serializeEditableContentState = (
  content: EditableContentState,
): PortableEditableContentState => ({
  experiences: content.experiences.map((item) => ({
    ...item,
    image: toPortableMediaValue(item.image),
  })),
  partners: content.partners.map((item) => ({
    ...item,
    logo: toPortableMediaValue(item.logo),
  })),
  teamSections: content.teamSections.map((section) => ({
    ...section,
    people: section.people.map((person) => ({
      ...person,
      image: toPortableMediaValue(person.image),
    })),
  })),
});

export const hydrateEditableContentState = (
  content: PortableEditableContentState,
): EditableContentState => ({
  experiences: content.experiences.map((item) => ({
    ...item,
    image: fromPortableMediaValue(item.image),
  })),
  partners: content.partners.map((item) => ({
    ...item,
    logo: fromPortableMediaValue(item.logo),
  })),
  teamSections: content.teamSections.map((section) => ({
    ...section,
    people: section.people.map((person) => ({
      ...person,
      image: fromPortableMediaValue(person.image),
    })),
  })),
});

const hasContentShape = (value: unknown): value is PortableEditableContentState =>
  isPlainObject(value) &&
  Array.isArray(value.experiences) &&
  Array.isArray(value.partners) &&
  Array.isArray(value.teamSections);

export const parseEditableContentImport = (input: unknown): EditableContentState => {
  if (hasContentShape(input)) {
    return hydrateEditableContentState(input);
  }

  if (
    isPlainObject(input) &&
    input.version === 1 &&
    typeof input.exportedAt === "string" &&
    hasContentShape(input.content)
  ) {
    return hydrateEditableContentState(input.content);
  }

  throw new Error("Invalid content file. Expected an editable content export JSON file.");
};

export const createEditableContentExport = (
  content: EditableContentState,
): EditableContentExportFile => ({
  version: 1,
  exportedAt: new Date().toISOString(),
  content: serializeEditableContentState(content),
});
