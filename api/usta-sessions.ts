const USTA_FILTERS_URL =
  "https://playtennis.usta.com/togethertennis/Coaching/GetSearchFilters?subCategory=GroupCoaching";
const USTA_SEARCH_URL =
  "https://prd-usta-kube.clubspark.pro/unified-search-api/api/Search/classic-coaching/Query";
const USTA_SESSION_TIME_ZONE = "America/New_York";
const USTA_SESSION_TIME_ZONE_LABEL = "ET";

type UstaFiltersResponse = {
  filters: {
    background: Array<{
      key: string;
      items: Array<{ value: string | number }>;
    }>;
  };
  latitude: string;
  longitude: string;
};

type UstaSearchItem = {
  id: string;
  name: string;
  nextDateTime?: string;
  endTime?: string;
  location?: { name?: string };
  leader?: { givenName?: string; familyName?: string };
  levels?: Array<{ name: string }>;
};

type TennisSession = {
  id: string;
  name: string;
  locationName: string;
  coachName: string;
  levelLabel: string;
  nextSessionLabel: string;
  dateLabel: string;
  timeLabel: string;
  link: string;
};

type UstaSearchResult = {
  item: UstaSearchItem;
};

const tennisDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: USTA_SESSION_TIME_ZONE,
});

const tennisSessionFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  timeZone: USTA_SESSION_TIME_ZONE,
});

const tennisTimeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  timeZone: USTA_SESSION_TIME_ZONE,
});

const formatClockTime = (time24?: string) => {
  if (!time24) {
    return "TBA";
  }

  const match = /^(\d{1,2}):(\d{2})$/.exec(time24.trim());
  if (!match) {
    return time24;
  }

  const hours = Number.parseInt(match[1], 10);
  const minutes = match[2];
  const meridiem = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;

  return `${displayHours}:${minutes} ${meridiem}`;
};

const formatUstaSession = (item: UstaSearchItem): TennisSession => {
  const nextSessionDate = item.nextDateTime ? new Date(item.nextDateTime) : null;
  const coachName = [item.leader?.givenName, item.leader?.familyName].filter(Boolean).join(" ");
  const levels = (item.levels ?? []).map((level) => level.name).filter(Boolean);

  return {
    id: item.id,
    name: item.name,
    locationName: item.location?.name ?? "TBA",
    coachName: coachName || "TBA",
    levelLabel: levels.length > 0 ? levels.join(", ") : "All levels",
    nextSessionLabel: nextSessionDate ? tennisSessionFormatter.format(nextSessionDate) : "TBA",
    dateLabel: nextSessionDate ? tennisDateFormatter.format(nextSessionDate) : "TBA",
    timeLabel: nextSessionDate
      ? `${tennisTimeFormatter.format(nextSessionDate)} - ${formatClockTime(item.endTime)} ${USTA_SESSION_TIME_ZONE_LABEL}`
      : "TBA",
    link: `https://playtennis.usta.com/togethertennis/Coaching/Session/${item.id}`,
  };
};

const parseFiltersResponse = async (response: Response): Promise<UstaFiltersResponse> => {
  const raw = await response.json();
  return typeof raw === "string" ? JSON.parse(raw) : raw;
};

export async function GET() {
  try {
    const filtersResponse = await fetch(USTA_FILTERS_URL, {
      headers: { Accept: "application/json" },
    });

    if (!filtersResponse.ok) {
      return Response.json({ error: "Unable to load USTA filters." }, { status: 502 });
    }

    const filtersData = await parseFiltersResponse(filtersResponse);

    const searchResponse = await fetch(USTA_SEARCH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        options: {
          size: 12,
          from: 0,
          sortKey: "date",
          // ClubSpark returns these two fields flipped in the filters payload.
          latitude: filtersData.longitude,
          longitude: filtersData.latitude,
        },
        filters: filtersData.filters.background,
      }),
    });

    if (!searchResponse.ok) {
      return Response.json({ error: "Unable to load USTA sessions." }, { status: 502 });
    }

    const searchData = await searchResponse.json();
    const sessions = ((searchData.searchResults ?? []) as UstaSearchResult[]).map((result) =>
      formatUstaSession(result.item),
    );

    return Response.json(sessions, {
      headers: {
        "Cache-Control": "public, s-maxage=600, stale-while-revalidate=3600",
      },
    });
  } catch {
    return Response.json({ error: "Live USTA sessions are unavailable right now." }, { status: 500 });
  }
}
