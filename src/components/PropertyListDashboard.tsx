import React, { useState } from "react";
import { RxPencil2 } from "react-icons/rx";

export interface IProperty {
  id: number;
  name: string;
  address: string;
  status: "occupied" | "free" | "check-in soon" | "check-out soon";
}

interface IPropertyListDashboardProps {
  propertyList: IProperty[];
}

const PropertyListDashboard: React.FC<IPropertyListDashboardProps> = (
  props: IPropertyListDashboardProps
) => {
  const [filteredPropertyList, setFilteredPropertyList] = useState<IProperty[]>(
    [...props.propertyList]
  );

  const handlePropertyTabSelection = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    console.log(event.target.id);
    if (event.target.id === "occupied_tab") {
      setFilteredPropertyList(
        props.propertyList.filter((p: IProperty) => p.status === "occupied")
      );
    } else if (event.target.id === "check_in_tab")
      setFilteredPropertyList(
        props.propertyList.filter(
          (p: IProperty) => p.status === "check-in soon"
        )
      );
    else if (event.target.id === "check_out_tab")
      setFilteredPropertyList(
        props.propertyList.filter(
          (p: IProperty) => p.status === "check-out soon"
        )
      );
    else if (event.target.id === "free_tab")
      setFilteredPropertyList(
        props.propertyList.filter((p: IProperty) => p.status === "free")
      );
    else if (event.target.id === "all_tab")
      setFilteredPropertyList(props.propertyList);
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
      <div role="tablist" className="tabs tabs-lifted mt-4">
        <button
          id="all_tab"
          role="tab"
          className="tab tab-active"
          onClick={(e) => handlePropertyTabSelection(e)}
        >
          All
        </button>
        <button
          id="occupied_tab"
          role="tab"
          className="tab"
          onClick={(e) => handlePropertyTabSelection(e)}
        >
          Occupied
        </button>
        <button
          id="check_in_tab"
          role="tab"
          className="tab"
          onClick={(e) => handlePropertyTabSelection(e)}
        >
          Check-in Soon
        </button>
        <button
          id="check_out_tab"
          role="tab"
          className="tab"
          onClick={(e) => handlePropertyTabSelection(e)}
        >
          Check-out Soon
        </button>
        <button
          id="free_tab"
          role="tab"
          className="tab"
          onClick={(e) => handlePropertyTabSelection(e)}
        >
          Free
        </button>
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
            {filteredPropertyList.map((property) => (
              <tr key={property.id}>
                <th></th>
                <td>{property.name}</td>
                <td>{property.address}</td>
                <td>{property.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PropertyListDashboard;
