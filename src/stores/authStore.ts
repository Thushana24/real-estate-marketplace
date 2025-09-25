import { User, Property } from "@prisma/client";
import cookieKeys from "@/configs/cookieKeys";
import Cookie from "js-cookie";
import { Dispatch, SetStateAction } from "react";
import { create } from "zustand";

interface IAuthStore {
  states: {
    user: User | null;
    authToken: string | null;
    selectedProperty: Property | null;
  };
  actions: {
    setUser: Dispatch<SetStateAction<User | null>>;
    setAuthToken: Dispatch<SetStateAction<string | null>>;
    setSelectedProperty: Dispatch<SetStateAction<Property | null>>;
    logout: () => void;
  };
}

const useAuthStore = create<IAuthStore>()((set) => ({
  states: {
    user: (JSON.parse(Cookie.get(cookieKeys.USER) || "null") as User) || null,
    authToken: (Cookie.get(cookieKeys.USER_TOKEN) || null) as string | null,
    selectedProperty:
      (JSON.parse(
        Cookie.get(cookieKeys.SELECTED_PROPERTY) || "null"
      ) as Property) || null,
  },
  actions: {
    setUser: (value) =>
      set(({ states }) => ({
        states: {
          ...states,
          user: typeof value === "function" ? value(states.user) : value,
        },
      })),
    setAuthToken: (value) =>
      set(({ states }) => ({
        states: {
          ...states,
          authToken:
            typeof value === "function" ? value(states.authToken) : value,
        },
      })),
    setSelectedProperty: (value) =>
      set(({ states }) => ({
        states: {
          ...states,
          selectedProperty:
            typeof value === "function"
              ? value(states.selectedProperty)
              : value,
        },
      })),
    logout: () => {
      Cookie.remove(cookieKeys.USER_TOKEN);
      Cookie.remove(cookieKeys.USER);
      Cookie.remove(cookieKeys.SELECTED_PROPERTY);

      return set(({ states }) => ({
        states: {
          ...states,
          authToken: null,
          user: null,
          selectedProperty: null,
        },
      }));
    },
  },
}));

const useAuth = () => useAuthStore((state) => state.states);
const useAuthActions = () => useAuthStore((state) => state.actions);

export { useAuth, useAuthActions };
