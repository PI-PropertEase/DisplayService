import { useContext, useState } from "react"
import { IoMdAdd } from "react-icons/io"
import ReservationTable from "./ReservationTable"
import CleaningTable from "./CleaningTable"
import MaintenanceTable from "./MaintenanceTable"
import EventModal from "./EventModal"
import DeleteEventModal from "./DeleteEventModal"
import { EventModalContext } from "../context/EventModalContext"
import { DetailsInfo } from "./DetailsInfo"
import { IEventType } from "../types/ReservationType"
import { PropertyDetailsToastContext } from "../context/PropertyDetailsToastContext"

enum TableTabs {
  DETAILS = "details",
  RESERVATIONS = "reservation events",
  CLEANING = "cleaning events",
  MAINTENANCE = "maintenance events",
}

const PropertyDetailsAllTables = () => {
  // selectedEvent is used to pass this data into the modal for editing/deleting a certain event
  const [selectedTab, setSelectedTab] = useState<TableTabs>(TableTabs.DETAILS)

  const { setModalOpen, setModalAction, setEventType } = useContext(EventModalContext)

  const {toastMessage, isShowing} = useContext(PropertyDetailsToastContext);


  return (
    <>
    <div className="flex justify-end">
      {(selectedTab ===  TableTabs.CLEANING || selectedTab ===  TableTabs.MAINTENANCE )&& (
              <button
              onClick={() => {
                setModalAction("Create")
                setEventType(selectedTab === TableTabs.CLEANING ? IEventType.CLEANING : IEventType.MAINTENANCE)
                setModalOpen(true)
              }}
              className="btn sm:btn-sm btn-xs btn-outline btn-success"
            >
              <IoMdAdd /> Create event
            </button>
        )}
    </div>
      <div className="">
        <div className="table-cell h-[4rem] align-middle text-xl w-[100vw]">
          <div
            role="tablist"
            className=" flex flex-row flex-wrap h-12 mt-4 sm:flex-col md:flex-row lg:flex-row xl:flex-row"
          >
            {[
              { id : TableTabs.DETAILS, label: "Details"},
              { id: TableTabs.RESERVATIONS, label: "Reservations" },
              { id: TableTabs.CLEANING, label: "Cleaning Events" },
              { id: TableTabs.MAINTENANCE, label: "Maintenance Events" },
            ].map((tab) => (
              <button
                key={tab.id}
                id={tab.id}
                role="tab"
                className={`tab flex-grow justify-center content-center border-b-2 rounded-tr-md rounded-tl-md text-lg font-light ${
                  tab.id === selectedTab ? "bg-secondary border-b-2 border-primary text-black" : ""
                }`}
                onClick={() => setSelectedTab(tab.id)}
              >
                {tab.label}
                {/* <span className="ml-3 badge capitalize text-[0.75rem] bg-orange-500 text-accent dark:bg-orange-900 dark:text-secondary border-none">
                      {reservations?.length ?? 0} events
                    </span> */}
              </button>
            ))}
          </div>
        </div>
        {/* close your eyes to code below */}
        {selectedTab === TableTabs.DETAILS ? (
          <DetailsInfo />
        ) : selectedTab === TableTabs.RESERVATIONS ? (
          <ReservationTable />
        )
        : selectedTab === TableTabs.CLEANING ? (
          <CleaningTable />
        ) : selectedTab === TableTabs.MAINTENANCE ? (
          <MaintenanceTable />
        ) : (
          ""
        )}
        {isShowing &&
            <div className={`toast toast-end transition-opacity duration-500 ${isShowing ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="alert alert-success font-thin">
                    <span>{toastMessage}</span>
                </div>
            </div>
        }
        <EventModal />
        <DeleteEventModal />
      </div>
    </>
  )
}

export default PropertyDetailsAllTables
