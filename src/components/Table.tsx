import { TbHttpDelete } from "react-icons/tb";
import { useLocation } from "react-router-dom";

import { FormDataProps, TableDataProps } from "../types";
import { useLoader, useSelectedStore } from "../utils/store";

const styleTable = {
  cell: "border-b border-gray-200 bg-darkwhite",
  actionBtn:
    "py-1 px-3 cursor-pointer font-curlfont text-base text-lightblack w-fit hover:text-darkwhite transition rounded-lg text-center",
};

const TableHeaderCell = ({ label }: { label: string }) => (
  <th className="px-4 py-5 border-b-2 border-gray-200 bg-lightblack text-base font-semibold text-darkwhite uppercase tracking-wider text-left">
    {label}
  </th>
);

const LabelCell = ({ data, label }: { data: string; label: string }) =>
  data ? (
    <span>{data}</span>
  ) : (
    <span className="text-lightgrey">{label} not found...</span>
  );

const UserCard = ({
  data,
  index,
  pathname,
}: {
  data: TableDataProps;
  index: number;
  pathname: string;
}) => {
  const { setSelected } = useSelectedStore();
  const { setIsEdit, setDelIsConfirm } = useLoader();

  const handleEdit = (data: FormDataProps) => {
    setIsEdit(true);
    setSelected([data]);
  };

  const handleDelete = (data: FormDataProps) => {
    setDelIsConfirm(true);
    setSelected([data]);
  };
  return (
    <tr>
      <td className={`${styleTable.cell} p-3`}>
        <p className="font-mainfont text-lg font-medium text-darkgrey text-center">
          {index + 1}
        </p>
      </td>
      <td className={`${styleTable.cell} p-3`}>
        <div className="items-center">
          <p className="font-codefont text-xl font-medium text-lightblack tracking-wide capitalize lg:text-lg md:text-base">
            <LabelCell label="Name" data={data.data.name} />
          </p>
          <p className="font-curlfont text-base md:text-sm font-semibold text-darkgrey ">
            <LabelCell label="Team" data={data.data.team} />
          </p>
        </div>
      </td>
      <td className={`${styleTable.cell} p-3`}>
        <p className="font-mainfont text-lg font-medium text-darkgrey text-left capitalize">
          <LabelCell label="Department" data={data.data.department} />
        </p>
      </td>
      <td className={`${styleTable.cell} p-3 `}>
        <a className="py-1 px-4 font-codefont text-base font-medium text-lightblack bg-primaryoff rounded-lg tracking-wide text-center">
          <LabelCell label="Item" data={data.data.item} />
        </a>
      </td>
      <td className={styleTable.cell}>
        <p className="items-center font-codefont text-xl font-semibold text-primarydark text-left lg:px-3 lg:py-4 lg:text-lg md:text-base">
          #
          <LabelCell label="Prize" data={data.data.prize} />
        </p>
      </td>
      {pathname === "/dashboard" && (
        <td className={`${styleTable.cell} text-right p-5`}>
          <p
            className={`font-extrabold hover:bg-primarylight ${styleTable.actionBtn}`}
            onClick={() => handleEdit(data.data)}
          >
            Edit
          </p>
          <p
            className={`font-bold hover:bg-red-600 ${styleTable.actionBtn}`}
            onClick={() => handleDelete(data.data)}
          >
            <TbHttpDelete className="w-8 h-8 " />
          </p>
        </td>
      )}
    </tr>
  );
};

const Table = ({ data }: { data: TableDataProps[] }) => {
  const { pathname } = useLocation();

  return (
    <div className="container my-4 px-12 lg:px-8 sm:px-2">
      <div className="shadow-[0_0_2px_rgba(50,69,107,0.4)] rounded-lg overflow-auto">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <TableHeaderCell label="No" />
              <TableHeaderCell label="Participant's name" />
              <TableHeaderCell label="Department" />
              <TableHeaderCell label="Event name" />
              <TableHeaderCell label="Prize" />
              {pathname === "/dashboard" && <TableHeaderCell label="Action" />}
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <UserCard
                key={index}
                data={user}
                index={index}
                pathname={pathname}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
