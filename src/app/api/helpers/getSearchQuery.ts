import { NextRequest } from "next/server";
import { z, ZodType } from "zod";

type SearchParam = {
  search?: string | undefined;
};

type SearchSchema = ZodType<SearchParam, any, any>;

const defaultSearchSchema = z.object({
  search: z.string().optional(),
});

type GetSearchParamOptions = {
  request: NextRequest;
  queryKey?: string;
  schema?: SearchSchema;
};

/**
 * Extracts and validates a query parameter from a NextRequest using a specified key.
 * @param options - Object containing the request, query key, and optional schema.
 * @param options.request - The NextRequest object containing query parameters.
 * @param options.queryKey - The key of the query parameter to extract (e.g., "search", "q").
 * @param options.schema - Optional custom Zod schema to validate the query param (defaults to a simple optional string).
 * @returns Validated query parameter as { search: string | undefined }.
 * @throws ZodError if validation fails.
 */
export function getSearchQuery({
  request,
  schema,
  queryKey = "search",
}: GetSearchParamOptions): SearchParam {
  const rawParams = {
    search: request.nextUrl.searchParams.get(queryKey) ?? undefined,
  };

  const schemaToBeUsed = schema ?? defaultSearchSchema;
  return schemaToBeUsed.parse(rawParams);
}
