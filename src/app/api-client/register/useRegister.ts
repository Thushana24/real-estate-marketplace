import { RegisterInput } from "@/app/api/types";
import { useApi } from "@/providers/ApiProvider";
import { useCreateMutation } from "../apiFactory";
import { User } from "@prisma/client";
export const useRegister = ({
  invalidateQueryKey,
}: {
  invalidateQueryKey?: unknown[];
}) => {
  const { jsonApiClient } = useApi();
  return useCreateMutation<
    Record<string, any>,
    RegisterInput,
    {
      data: {
        user: User;
        token: string;
      };
    },
    {
      data: {
        user: User;
        token: string;
      };
    }
  >({
    apiClient: jsonApiClient,
    method: "post",
    url: "/auth/register",
    errorMessage: "Failed to register user.",
    invalidateQueryKey,
    mutationOptions: {},
  });
};
