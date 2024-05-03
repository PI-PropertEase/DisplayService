import { useContext, useState } from "react"
import { IoMdAdd } from "react-icons/io"
import ReservationTable from "./ReservationTable"
import CleaningTable from "./CleaningTable"
import MaintenanceTable from "./MaintenanceTable"
import EventModal from "./EventModal"
import DeleteEventModal from "./DeleteEventModal"
import { EventModalContext } from "../context/EventModalContext"

enum TableTabs {
  RESERVATIONS = "reservation events",
  CLEANING = "cleaning events",
  MAINTENANCE = "maintenance events",
}

const PropertyDetailsAllTables = () => {
  // selectedEvent is used to pass this data into the modal for editing/deleting a certain event
  const [selectedTab, setSelectedTab] = useState<TableTabs>(TableTabs.RESERVATIONS)

  const { setModalOpen, setModalAction } = useContext(EventModalContext)

  return (
    <>
    <div className="flex justify-end">
      <button
          onClick={() => {
            console.log("clicked here hehe")
            setModalAction("Create")
            setModalOpen(true)
          }}
          className="btn sm:btn-sm btn-xs btn-outline btn-success"
        >
          <IoMdAdd /> Create event
        </button>
    </div>
      <div className="overflow-auto h-full">
        <div className="table-cell h-[4rem] align-middle text-xl w-[100vw]">
          <div
            role="tablist"
            className=" flex flex-row flex-wrap h-12 mt-4 sm:flex-col md:flex-row lg:flex-row xl:flex-row"
          >
            {[
              { id: TableTabs.RESERVATIONS, label: "Reservation Events" },
              { id: TableTabs.CLEANING, label: "Cleaning Events" },
              { id: TableTabs.MAINTENANCE, label: "Maintenance Events" },
            ].map((tab) => (
              <button
                key={tab.id}
                id={tab.id}
                role="tab"
                className={`tab flex-grow justify-center content-center border-b-2 rounded-tr-md rounded-tl-md ${
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
        {selectedTab === TableTabs.RESERVATIONS ? (
          <ReservationTable />
        ) : selectedTab === TableTabs.CLEANING ? (
          <CleaningTable />
        ) : selectedTab === TableTabs.MAINTENANCE ? (
          <MaintenanceTable />
        ) : (
          ""
        )}
        <EventModal />
        <DeleteEventModal />
      </div>
    </>
  )
}

export default PropertyDetailsAllTables
