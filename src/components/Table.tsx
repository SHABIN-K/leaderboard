const TableHeader = () => {
  const styleTableHeader = {
    cell: "px-4 py-5 border-b-2 border-gray-200 bg-lightblack text-base font-semibold text-darkwhite uppercase tracking-wider",
    centerText: "text-center",
    leftText: "text-left",
    lgHidden: "lg:hidden",
    lgTextSm: "lg:text-sm",
    xsHidden: "xs:hidden",
  };
  return (
    <thead>
      <tr>
        <th
          className={`${styleTableHeader.centerText} ${styleTableHeader.lgHidden} ${styleTableHeader.cell}`}
        >
          SL No.
        </th>
        <th
          className={`${styleTableHeader.centerText} ${styleTableHeader.lgTextSm} ${styleTableHeader.cell}`}
        >
          Rank
        </th>
        <th
          className={`${styleTableHeader.leftText} ${styleTableHeader.lgTextSm} ${styleTableHeader.cell}`}
        >
          Participant&apos;s Info
        </th>
        <th
          className={`${styleTableHeader.leftText} ${styleTableHeader.lgHidden} ${styleTableHeader.cell}`}
        >
          GitHub Handle
        </th>
        <th
          className={`${styleTableHeader.leftText} ${styleTableHeader.lgHidden} ${styleTableHeader.cell}`}
        >
          View All PRs
        </th>
        <th
          className={`${styleTableHeader.centerText} ${styleTableHeader.lgTextSm} ${styleTableHeader.xsHidden} ${styleTableHeader.cell}`}
        >
          Points
        </th>
      </tr>
    </thead>
  );
};

const UserCard = () => {};

const Table = ({ data }: { data: userDataType[] }) => {
  return (
    <div className="container my-4 px-12 lg:px-8 sm:px-2">
      <div className="shadow-[0_0_2px_rgba(50,69,107,0.4)] rounded-lg overflow-hidden">
        <table className="w-full table-auto">
          <TableHeader />
          <tbody>
            {data.map((user, index) => {
              <UserCard key={index} data={user} index={index} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
