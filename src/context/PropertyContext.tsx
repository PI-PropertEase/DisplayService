import React, { createContext, useState } from "react";
import { IReservation } from "../types/ReservationType";
import { IPropertyDetails } from "../main";

interface PropertyContextType {
  properties: IPropertyDetails[];
  setProperties: React.Dispatch<React.SetStateAction<IPropertyDetails[]>>;

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

export const PropertyContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [properties, setProperties] = useState<IPropertyDetails[]>([]);
  const [reservations, setReservations] = useState<IReservation[]>([]);
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
