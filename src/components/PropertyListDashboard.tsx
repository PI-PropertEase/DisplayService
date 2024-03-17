import React, { useState } from "react";
import { RxPencil2 } from "react-icons/rx";
import PropertyListBadge from "./PropertyListBadge";

export interface IProperty {
  id: number;
  name: string;
  address: string;
  status: "Occupied" | "Free" | "Check-in Soon" | "Check-out Soon";
  arrival: Date; // TODO: arrival e departure provavelmente vêm noutro formato
  departure: Date;
  price: number;
}

interface IPropertyListDashboardProps {
  propertyList: IProperty[];
}

const PropertyListDashboard: React.FC<IPropertyListDashboardProps> = (
  props: IPropertyListDashboardProps
) => {
  const [propertyListState, setPropertyListState] = useState<{
    propertyList: IProperty[];
    activeTab: string;
  }>({
    propertyList: [...props.propertyList],
    activeTab: "all_tab",
  });
  /* 
    When tab is selected, re-renders table with filtered values,
    and updates the active html element to the element that was clicked 
  */
  const handlePropertyTabSelection = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    const event_id = (event.target as HTMLElement).id;
    if (event_id === "occupied_tab") {
      setPropertyListState({
        propertyList: props.propertyList.filter(
          (p: IProperty) => p.status === "Occupied"
        ),
        activeTab: event_id,
      });
      return;
    }
    if (event_id === "check_in_tab") {
      setPropertyListState({
        propertyList: props.propertyList.filter(
          (p: IProperty) => p.status === "Check-in Soon"
        ),
        activeTab: event_id,
      });
      return;
    }

    if (event_id === "check_out_tab") {
      setPropertyListState({
        propertyList: props.propertyList.filter(
          (p: IProperty) => p.status === "Check-out Soon"
        ),
        activeTab: event_id,
      });
      return;
    }
    if (event_id === "free_tab") {
      setPropertyListState({
        propertyList: props.propertyList.filter(
          (p: IProperty) => p.status === "Free"
        ),
        activeTab: event_id,
      });
      return;
    }

    if (event_id === "all_tab") {
      setPropertyListState({
        propertyList: props.propertyList,
        activeTab: event_id,
      });
      return;
    }
  };

  return (
    <div className="p-[1.5rem]">
      <div className="font-bold text-2xl content-center justify-center">
        <RxPencil2 className="inline-block" />
        <span className="ml-2">Properties</span>
        <span className="ml-2 badge text-base bg-[#FAAD1F] dark:bg-orange-800">
          {props.propertyList.length}
        </span>
      </div>
      <div role="tablist" className="tabs tabs-bordered mt-4 shadow-md">
        {[
          { id: "all_tab", label: "All" },
          { id: "occupied_tab", label: "Occupied" },
          { id: "check_in_tab", label: "Check-in Soon" },
          { id: "check_out_tab", label: "Check-out Soon" },
          { id: "free_tab", label: "Free" },
        ].map((tab) => (
          <button
            key={tab.id}
            id={tab.id}
            role="tab"
            className={`inline-block tab tabs-lg  ${
              propertyListState.activeTab === tab.id ? "tab-active " : ""
            }`}
            style={{
              borderColor: "#FDA883",
              backgroundColor:
                propertyListState.activeTab === tab.id ? "#FEECE4" : "",
            }}
            onClick={(e) => handlePropertyTabSelection(e)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto mt-5 border rounded-xl">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th className="text-accent dark:text-slate-50 text-base">Name</th>
              <th className="text-accent dark:text-slate-50 text-base">
                Address
              </th>
              <th className="text-accent dark:text-slate-50 text-base">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {propertyListState.propertyList.map((property) => (
              <tr key={property.id}>
                <th></th>
                <td>{property.name}</td>
                <td>{property.address}</td>
                <td>
                  <PropertyListBadge text={property.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PropertyListDashboard;
