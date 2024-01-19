import { auth } from "../utils";
import data from "../utils/data.json";
import { TableDataType } from "../types";
import { SearchInput, Table } from "../components";

import { useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "sonner";
import { IoMdAdd } from "react-icons/io";

const styleDashboard = {
  addbtn:
    "py-3 px-4 inline-flex items-center text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none",
};

const Header: React.FC<{ navigate: NavigateFunction }> = ({ navigate }) => {
  const handleSignOut = () => {
    try {
      signOut(auth).then(() => {
        toast("You have been successfully logged out. See you next time!");
        navigate("/");
      });
    } catch (error) {
      console.error(error);
      toast("oops! something went wrong!");
    }
  };

  return (
    <nav className="border-gray-200 px-4 lg:px-6 py-2.5 bg-gray-800">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <div className="flex items-center self-center text-xl font-semibold whitespace-nowrap text-white">
          leaderboard
        </div>
        <div className="flex items-center lg:order-2">
          <div
            onClick={handleSignOut}
            className="text-white focus:ring-4 bg-blue-600 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none focus:ring-gray-800 cursor-pointer"
          >
            Log out
          </div>
        </div>
      </div>
    </nav>
  );
};

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
      <Header navigate={navigate} />
      <div className="ml-5 mt-5 space-x-2">
        <button className={styleDashboard.addbtn}>
          <IoMdAdd className="w-4 h-4" />
          Create Team
        </button>
        <button className={styleDashboard.addbtn}>
          <IoMdAdd className="w-4 h-4" />
          Add item
        </button>
      </div>
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
