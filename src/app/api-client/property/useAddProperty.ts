import { useApi } from "@/providers/ApiProvider";
import { useCreateMutation } from "../apiFactory";
import { Property, PropertyImage } from "@prisma/client";
import { PropertyInput } from "@/app/api/types";

export const useLogin = ({
  invalidateQueryKey,
}: {
  invalidateQueryKey?: unknown[];
}) => {
  const { jsonApiClient } = useApi();

  return useCreateMutation<
    Record<string, any>,
    PropertyInput,
    {
      data: Property & { PropertyImage: PropertyImage[] };
    },
    {
      data: Property & { PropertyImage: PropertyImage[] };
    }
  >({
    apiClient: jsonApiClient,
    method: "post",
    url: "/property/add",
    errorMessage: "Failed to add property.",
    invalidateQueryKey,
    mutationOptions: {},
  });
};
