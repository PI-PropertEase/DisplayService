import { ReservationStatus } from "../types/ReservationType";

interface IReservationStatusBadgeProps {
    status: ReservationStatus
  }
  
const ReservationStatusBadge: React.FC<IReservationStatusBadgeProps> = (props: IReservationStatusBadgeProps) => {
    const textToColor: Record<string, { light: string; dark: string }> = {
        [ReservationStatus.CONFIRMED]: { light: "bg-[#12b76a]", dark: "dark:bg-[#11620B]" },
        [ReservationStatus.PENDING]: { light: "bg-[#b79712]", dark: "dark:bg-[#ae8c00]" },
        [ReservationStatus.CANCELED]: { light: "bg-[#c95366]", dark: "dark:bg-[#A72A2C]" },
    }

    return (
        <div>
        <span
            className={`badge text-xs text-center content-center border-none capitalize ${
            textToColor[props.status].light
            } ${textToColor[props.status].dark}`}
        >
            {props.status.toString()}
        </span>
        </div>
    )
}

export default ReservationStatusBadge
