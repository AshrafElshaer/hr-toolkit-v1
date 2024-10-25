

import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";
import { z } from "zod";

export const employeesTableFiltersSearchParamsCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
  sort: parseAsString.withDefault(""),

  status: parseAsArrayOf(parseAsString).withDefault([]),
  departments: parseAsArrayOf(parseAsString).withDefault([]),
  role: parseAsArrayOf(parseAsString).withDefault([]),
  type: parseAsArrayOf(parseAsString).withDefault([]),
  department: parseAsArrayOf(parseAsString).withDefault([]),
  name: parseAsString.withDefault(""),
});
