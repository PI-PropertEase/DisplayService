import React, { createContext, useEffect, useState } from "react";
import { IReservation } from "../types/ReservationType";
import { IFetchProperty } from "../types/PropertyType";
import { useQuery } from "react-query";
import { fetchProperties } from "../services/Property.service";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { IUser } from "../types/UserType";

interface PropertyContextType {
  properties: IFetchProperty[];
  setProperties: React.Dispatch<React.SetStateAction<IFetchProperty[]>>;

  reservations: IReservation[];
  setReservations: React.Dispatch<React.SetStateAction<IReservation[]>>;
}

const defaultContextState: PropertyContextType = {
  properties: [],
  setProperties: () => {},
  reservations: [],
  setReservations: () => {},
};

export const PropertyContext =
  createContext<PropertyContextType>(defaultContextState);

export const PropertyContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<IFetchProperty[]>([]);
  const [reservations, setReservations] = useState<IReservation[]>([]);
  
  const auth = useAuthUser<IUser>();
  const authHeader = useAuthHeader() ?? '';


  const { data: initialProperties } = useQuery<IFetchProperty[]>(
    "fetchProperties",
    () => fetchProperties(auth?.email ?? "", authHeader ?? "")
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
        reservations,
        setReservations,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};
