import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";

export const departmentsTableFiltersSearchParamsCache = createSearchParamsCache(
  {
    page: parseAsInteger.withDefault(1),
    perPage: parseAsInteger.withDefault(10),
    sort: parseAsString.withDefault(""),
    name: parseAsString.withDefault(""),
  },
);
