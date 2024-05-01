import React, { createContext, useEffect, useState } from "react";
import { IFetchProperty } from "../types/PropertyType";
import { useQuery } from "react-query";
import { fetchProperties } from "../services/Property.service";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { IUserState } from "../types/UserType";

interface PropertyContextType {
  properties: IFetchProperty[];
  setProperties: React.Dispatch<React.SetStateAction<IFetchProperty[]>>;
}

const defaultContextState: PropertyContextType = {
  properties: [],
  setProperties: () => {},
};

export const PropertyContext =
  createContext<PropertyContextType>(defaultContextState);

export const PropertyContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<IFetchProperty[]>([]);
  
  const auth = useAuthUser<IUserState>();
  const authHeader = useAuthHeader() ?? '';


  const { data: initialProperties } = useQuery<IFetchProperty[]>(
    "fetchProperties",
    () => fetchProperties(auth?.email ?? "", authHeader ?? ""),
    {
      staleTime: 10000,
    }
  );

  useEffect(() => {
    if (initialProperties) {
      setProperties(initialProperties);
    }
  }, [initialProperties]);

  return (
    <PropertyContext.Provider
      value={{
        properties,
        setProperties,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};
