import { teamCard } from "../utils";

interface userDataType {
  user_name: string;
  avatar_url: string;
  user_url: string;
  total_points: number;
  full_name: string;
  college: string;
  rank: number;
}

const TableHeader = () => {
  const styleTableHeader = {
    cell: "px-4 py-5 border-b-2 border-gray-200 bg-lightblack text-base font-semibold text-darkwhite uppercase tracking-wider text-left",
    lgHidden: "lg:hidden",
    lgTextSm: "lg:text-sm",
    xsHidden: "xs:hidden",
  };
  return (
    <thead>
      <tr>
        <th className={`${styleTableHeader.lgHidden} ${styleTableHeader.cell}`}>
          SL No.
        </th>
        <th className={`${styleTableHeader.lgTextSm} ${styleTableHeader.cell}`}>
          Participant&apos;s name
        </th>
        <th className={`${styleTableHeader.lgTextSm} ${styleTableHeader.cell}`}>
          Item
        </th>
        <th className={`${styleTableHeader.lgTextSm} ${styleTableHeader.cell}`}>
          prize
        </th>
        <th
          className={`${styleTableHeader.lgTextSm} ${styleTableHeader.xsHidden} ${styleTableHeader.cell}`}
        >
          Certificate
        </th>
      </tr>
    </thead>
  );
};

const UserCard = ({ data, index }: { data: userDataType; index: number }) => {
  return (
    <tr>
      <td className="p-5 border-b border-gray-200 bg-darkwhite lg:hidden">
        <p className="font-mainfont text-lg font-medium text-darkgrey text-center">
          {index + 1}
        </p>
      </td>
      <td className="p-5 border-b border-gray-200 bg-darkwhite w-1/2 lg:px-3 lg:py-4">
        <div className="flex items-center">
          <div>
            <p className="font-codefont text-xl font-medium text-lightblack tracking-wide capitalize lg:text-lg md:text-base">
              {data.full_name || (
                <span className="text-lightgrey">Name not found...</span>
              )}
            </p>
            <p className="font-curlfont text-base md:text-sm font-semibold text-darkgrey ">
              {teamCard[Math.floor(Math.random() * teamCard.length)].name || (
                <span className="text-warningoff">College not found...</span>
              )}
            </p>
          </div>
        </div>
      </td>
      <td className="p-5 border-b border-gray-200 bg-darkwhite">
        <a className="py-1 px-4 font-codefont text-base font-medium text-lightblack bg-primaryoff rounded-lg tracking-wide text-center">
          {data.user_name}
        </a>
      </td>
      <td className="border-b border-gray-200 bg-darkwhite">
        <p className="items-center font-codefont text-xl font-semibold text-primarydark text-left lg:px-3 lg:py-4 lg:text-lg md:text-base">
          #{["first", "second", "third"][Math.floor(Math.random() * 3)]}
        </p>
      </td>
      <td className="p-5 border-b text-right border-gray-200 bg-darkwhite">
        <p className="py-1 px-3 cursor-pointer font-curlfont text-base font-bold text-lightblack w-fit hover:text-darkwhite hover:bg-primarylight transition rounded-lg text-center">
          view
        </p>
      </td>
    </tr>
  );
};

const Table = ({ data }: { data: userDataType[] }) => {
  return (
    <div className="container my-4 px-12 lg:px-8 sm:px-2">
      <div className="shadow-[0_0_2px_rgba(50,69,107,0.4)] rounded-lg overflow-auto">
        <table className="w-full table-auto">
          <TableHeader />
          <tbody>
            {data.map((user, index) => (
              <UserCard key={index} data={user} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
