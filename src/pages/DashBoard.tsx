import { useEffect, useState } from "react";
import { SearchInput, Table } from "../components";
import { TableDataType } from "../types";
import data from "../utils/data.json";

const DashBoard = () => {
  const [tableData, setTableData] = useState<TableDataType[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [searchedData, setSearchedData] = useState<
    TableDataType[] | undefined
  >();

  useEffect(() => {
    setTableData(data.data);
  }, []);
  return (
    <div>
      <SearchInput
        value={searchText}
        setSearchText={setSearchText}
        setSearchedData={setSearchedData}
      />
      <Table
        data={searchText ? (searchedData as TableDataType[]) : tableData}
      />
    </div>
  );
};

export default DashBoard;
