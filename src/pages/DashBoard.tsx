import data from "../utils/data.json";
import { SearchInput, Table } from "../components";
import { FormDataProps, TableDataType } from "../types";
import { auth, db, fireConfig } from "../firebase/firebase";
import ProtectedDashboard from "../layout/ProtectedDashboard";
import { CreateEditItem, teamData } from "../components/modal";

import { toast } from "sonner";
import { signOut } from "firebase/auth";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { addDoc, collection, doc, Timestamp } from "firebase/firestore";

const styleDashboard = {
  addbtn:
    "py-3 px-4 inline-flex items-center text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none",
};

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        toast("You have been successfully logged out. See you next time!");
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        toast("Oops! Something went wrong!");
      });
  };

  return (
    <nav className="border-gray-200 px-4 lg:px-6 py-2.5 bg-gray-800">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <div className="flex items-center self-center text-xl font-semibold whitespace-nowrap text-white">
          Dashboard
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
  const [tableData, setTableData] = useState<TableDataType[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [searchedData, setSearchedData] = useState<
    TableDataType[] | undefined
  >();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTableData(data.data);
  }, []);

  const onCreate = async (newItem: FormDataProps) => {
    setIsLoading(true);

    const docData = {
      data: newItem,
      date: Timestamp.fromDate(new Date()),
    };

    try {
      if (!newItem.name) {
        toast("name is required");
        return;
      }
      // Find the link based on newItem.team in teamData
      const teamLink = teamData.find(
        (team) => team.name === newItem.team
      )?.link;

      const collectionRef = collection(db, fireConfig.collection);
      const ref = doc(collectionRef, teamLink);
      const docRef = collection(ref, fireConfig.subCollection);

      await addDoc(docRef, docData).then(() => {
        toast("created successfully");
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      setIsLoading(false);
      setIsAddOpen(false);
    }
  };

  return (
    <ProtectedDashboard>
      <Header />
      <div className="ml-5 mt-5 space-x-2">
        <button className={styleDashboard.addbtn}>
          <IoMdAdd className="w-4 h-4" />
          Create Team
        </button>
        <button
          onClick={() => setIsAddOpen(true)}
          className={styleDashboard.addbtn}
        >
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
      {isAddOpen && (
        <CreateEditItem
          onOpen={isAddOpen}
          onClose={setIsAddOpen}
          onSave={onCreate}
          isLoading={isLoading}
          title="Add student details"
          btnLabel="Add"
        />
      )}
    </ProtectedDashboard>
  );
};

export default DashBoard;
