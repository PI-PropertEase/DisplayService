import React from "react";
import { IProperty } from "./PropertyListDashboard";
import PropertyListBadge from "./PropertyListBadge";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { FaArrowLeft, FaArrowRight, FaRegTrashAlt } from "react-icons/fa";

interface IPropertyTableProps {
  propertyList: IProperty[];
}

const PropertyTable: React.FC<IPropertyTableProps> = (
  props: IPropertyTableProps
) => {
  return (
    <div className="overflow-auto">
      <div className="table-cell h-[4rem] pl-6 align-middle text-xl">
        Properties
        <span className="ml-3 badge text-sm bg-orange-300">100 Properties</span>
      </div>
      <table className="table">
        {/* head */}
        <thead className="bg-[#FEEBE2] dark:bg-[#1A0C01] text-black dark:text-white">
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Name and Address</th>
            <th>Status</th>
            <th className="text-center">Arrival</th>
            <th className="text-center">Departure</th>
            <th className="text-center">Current Price</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {props.propertyList.map((property: IProperty) => {
            return (
              <tr key={property.id}>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold">{property.name}</div>
                      <div className="text-sm opacity-50">
                        {property.address}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <PropertyListBadge text={property.status} />
                </td>
                <td className="text-center">
                  {property.arrival.toLocaleString()}
                </td>
                <td className="text-center">
                  {property.departure.toLocaleString()}
                </td>
                <td className="text-center">{property.price}€</td>
                <td>
                  <a href="">
                    <FaRegTrashAlt />
                  </a>
                </td>
                <td>
                  <a href="">
                    <BsBoxArrowUpRight />
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="w-full pl-6 pr-6">
        <div className="flex">
          <button className="btn btn-outline flex-1">
            <FaArrowLeft /> Previous
          </button>
          {/* Pagination section*/}
          <div className="join flex-[16] justify-center content-center">
            <button className="join-item btn bg-white dark:bg-transparent">
              1
            </button>
            <button className="join-item btn bg-secondary border-none text-primary">
              2
            </button>
            <button className="join-item btn bg-white dark:bg-transparent">
              3
            </button>
            <button className="join-item btn bg-white dark:bg-transparent">
              4
            </button>
          </div>
          <button className="btn btn-outline flex-1">
            Next <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyTable;
