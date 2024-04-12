import React, { useState } from "react";
import { IProperty } from "./PropertyListDashboard";
import PropertyListBadge from "./PropertyListBadge";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { FaArrowLeft, FaArrowRight, FaRegTrashAlt } from "react-icons/fa";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

interface IPropertyTableProps {
  propertyList: IProperty[];
}

const PropertyTable: React.FC<IPropertyTableProps> = (
  props: IPropertyTableProps
) => {
  const PAGE_SIZE = 10;

  const [paginationNumber, setPaginationNumber] = useState<number>(1);

  const numberOfPages = Math.ceil(props.propertyList.length / PAGE_SIZE);

  let paginationArray: number[] = []; // [1,2, ..., n] where n = number of pages

  for (let i = 1; i <= numberOfPages; i++) {
    paginationArray.push(i);
  }

  // only show buttons for pages whose number is within 2 of current page
  // example: current page is 2 -> only show buttons for pages [1, 2, 3, 4]
  paginationArray = paginationArray.filter(
    (n) => !(Math.abs(paginationNumber - n) > 2)
  );

  return (
    <div className="overflow-auto h-full">
      <div className="table-cell h-[4rem] pl-6 align-middle text-xl">
        Properties
        <span className="ml-3 badge text-[0.75rem] bg-secondary text-[#FDA882] dark:bg-orange-900 dark:text-secondary border-none">
          {props.propertyList.length} Properties
        </span>
      </div>
      <table className="table">
        {/* head */}
        <thead className="bg-secondary dark:bg-[#1A0C01] text-black dark:text-white">
          <tr className="max-[760px]:block max-[760px]:clip-out">
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
          {props.propertyList
            .slice(
              PAGE_SIZE * (paginationNumber - 1),
              PAGE_SIZE * paginationNumber
            )
            .map((property: IProperty) => {
              return (
                <tr
                  key={property.id}
                  className="max-[760px]:block max-[760px]:border-[#eee] max-[760px]:dark:border-[#223] max-[760px]:border-t-8 max-[760px]:border-b-0 max-[760px]:mb-2 max-[760px]:p-2"
                >
                  <th className="max-[760px]:clip-out">
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td
                    data-label="Address"
                    className="max-[760px]:block max-[760px]:text-right max-[760px]:before:content-datalabel max-[760px]:border-b-[1px] max-[760px]:border-[#eee] max-[760px]:dark:border-[#223]"
                  >
                    <div className="lg:flex items-center gap-3">
                      <div>
                        <div className="font-bold">{property.name}</div>
                        <div className="text-sm opacity-50">
                          {property.address}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td
                    className="max-[760px]:block max-[760px]:text-right max-[760px]:before:content-datalabel max-[760px]:border-b-[1px] max-[760px]:border-[#eee] max-[760px]:dark:border-[#223]"
                    data-label="Status"
                  >
                    <PropertyListBadge text={property.status} />
                  </td>
                  <td
                    data-label="Departure"
                    className="text-center max-[760px]:block max-[760px]:text-right max-[760px]:before:content-datalabel max-[760px]:border-b-[1px] max-[760px]:border-[#eee] max-[760px]:dark:border-[#223]"
                  >
                    {property.arrival.toLocaleString()}
                  </td>
                  <td
                    data-label="Arrival"
                    className="text-center max-[760px]:block max-[760px]:text-right max-[760px]:before:content-datalabel max-[760px]:border-b-[1px] max-[760px]:border-[#eee] max-[760px]:dark:border-[#223]"
                  >
                    {property.departure.toLocaleString()}
                  </td>
                  <td
                    data-label="Price"
                    className="text-center max-[760px]:block max-[760px]:text-right max-[760px]:before:content-datalabel max-[760px]:border-b-[1px] max-[760px]:border-[#eee] max-[760px]:dark:border-[#223]"
                  >
                    {property.price}€
                  </td>
                  <td
                    data-label="Delete"
                    className="text-center max-[760px]:flex max-[760px]:before:content-datalabel max-[760px]:border-b-[1px] max-[760px]:border-[#eee] max-[760px]:dark:border-[#223]"
                  >
                    <a href="" className="max-[760px]:ml-auto">
                      <FaRegTrashAlt />
                    </a>
                  </td>
                  <td
                    data-label="More Details"
                    className="text-center max-[760px]:flex max-[760px]:before:content-datalabel"
                  >
                    <a href="" className="max-[760px]:ml-auto">
                      <BsBoxArrowUpRight />
                    </a>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {/* Table Footer */}
      <div className="w-full p-6">
        <div className="flex">
          <button
            className="btn btn-outline flex-1"
            onClick={() => {
              if (paginationNumber > 1)
                setPaginationNumber(paginationNumber - 1);
            }}
          >
            <FaArrowLeft /> Previous
          </button>
          <div className="join flex-[16] justify-center content-center">
            <button
              className={`join-item btn bg-white dark:bg-transparent ${
                paginationNumber === 1 ? "btn-disabled" : ""
              }`}
              onClick={() => setPaginationNumber(1)}
            >
              {" "}
              <MdKeyboardDoubleArrowLeft />
            </button>
            {paginationArray.map((num) => {
              return (
                <button
                  key={num}
                  className={`join-item btn  ${
                    paginationNumber === num
                      ? "bg-secondary dark:bg-orange-800"
                      : "bg-white dark:bg-transparent"
                  }`}
                  onClick={() => setPaginationNumber(num)}
                >
                  {num}
                </button>
              );
            })}
            <button
              className={`join-item btn bg-white dark:bg-transparent ${
                paginationNumber === numberOfPages ? "btn-disabled" : ""
              }`}
              onClick={() => setPaginationNumber(numberOfPages)}
            >
              <MdKeyboardDoubleArrowRight />
            </button>
          </div>
          <button
            className="btn btn-outline flex-1"
            onClick={() => {
              if (paginationNumber < numberOfPages)
                setPaginationNumber(paginationNumber + 1);
            }}
          >
            Next <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyTable;
