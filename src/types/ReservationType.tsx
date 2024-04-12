export interface IReservation {
  id: number;
  property_id: number;
  event_type: IReservationType;
  service: string;
  status: "pending" | "confirm";
  begin_time: Date;
  end_time: Date;
}

// TODO: provavelmente nomes diferentes
export enum IReservationType {
  OCCUPATION = "occupation",
  CLEANING = "cleaning",
  MAINTENANCE = "maintenance",
}
