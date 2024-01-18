import { auth } from "../utils";
import data from "../utils/data.json";
import { TableDataType } from "../types";
import { SearchInput, Table } from "../components";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

const DashBoard = () => {
  const navigate = useNavigate();

  const [tableData, setTableData] = useState<TableDataType[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [searchedData, setSearchedData] = useState<
    TableDataType[] | undefined
  >();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setTableData(data.data);
      } else {
        // User is not authenticated, redirect to login page
        navigate("/login");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigate]);

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
