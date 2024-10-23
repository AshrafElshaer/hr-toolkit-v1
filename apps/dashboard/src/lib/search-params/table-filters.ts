import { TimeSheetStatusEnum } from "@toolkit/supabase/types";
import { Tables } from "@toolkit/supabase/types";
import moment from "moment";
import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";
import { z } from "zod";
import { parseAsSort } from "./parsers";

export const tableFiltersSearchParamsCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
  sort: parseAsString.withDefault(""),

  status: parseAsArrayOf(
    z.enum(Object.keys(TimeSheetStatusEnum) as [string, ...string[]]),
  ).withDefault([]),
  from: parseAsString.withDefault(
    moment().startOf("month").format("YYYY-MM-DD"),
  ),
  to: parseAsString.withDefault(moment().endOf("month").format("YYYY-MM-DD")),
});
