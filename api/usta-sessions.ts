const USTA_FILTERS_URL =
  "https://playtennis.usta.com/togethertennis/Coaching/GetSearchFilters?subCategory=GroupCoaching";
const USTA_SEARCH_URL =
  "https://prd-usta-kube.clubspark.pro/unified-search-api/api/Search/classic-coaching/Query";

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

type UstaSearchResult = {
  item: {
    id: string;
    name: string;
    nextDateTime?: string;
    endTime?: string;
    location?: { name?: string };
    leader?: { givenName?: string; familyName?: string };
    levels?: Array<{ name: string }>;
  };
};

const tennisDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const tennisSessionFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

const tennisTimeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
});

const formatClockTime = (time24?: string) => {
  if (!time24) {
    return "TBA";
  }

  const [hours, minutes] = time24.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return tennisTimeFormatter.format(date);
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
    const sessions = ((searchData.searchResults ?? []) as UstaSearchResult[]).map((result) => {
      const item = result.item;
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
          ? `${tennisTimeFormatter.format(nextSessionDate)} - ${formatClockTime(item.endTime)}`
          : "TBA",
        link: `https://playtennis.usta.com/togethertennis/Coaching/Session/${item.id}`,
      };
    });

    return Response.json(sessions, {
      headers: {
        "Cache-Control": "public, s-maxage=600, stale-while-revalidate=3600",
      },
    });
  } catch {
    return Response.json({ error: "Live USTA sessions are unavailable right now." }, { status: 500 });
  }
}
