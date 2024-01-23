import { fetchStudent } from "../firebase";
import { SearchInput, Table } from "../components";
import { FormDataProps, TableDataProps } from "../types";
import { auth, db, fireConfig } from "../firebase/firebase";
import ProtectedDashboard from "../layout/ProtectedDashboard";
import { CreateEditItem, prizeData, teamData } from "../components/modal";

import {
  addDoc,
  collection,
  doc,
  increment,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { toast } from "sonner";
import { signOut } from "firebase/auth";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

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
  const [tableData, setTableData] = useState<TableDataProps[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [searchedData, setSearchedData] = useState<
    FormDataProps[] | undefined
  >();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await fetchStudent(setTableData);
    };
    fetchData();
  }, []);

  const onCreate = async (newItem: FormDataProps) => {
    setIsLoading(true);

    try {
      if (!newItem.name) {
        toast("Name is required");
        return;
      }

      // Find the link based on newItem.team in teamData
      const teamLink = teamData.find(
        (team) => team.name === newItem.team
      )?.link;
      // Find the point based on newItem. in teamData
      const point = prizeData.find(
        (prize) => prize.name === newItem.prize
      )?.point;

      const collectionRef = collection(db, fireConfig.collection);
      const teamDocRef = doc(collectionRef, teamLink);
      const subCollectionRef = collection(teamDocRef, fireConfig.subCollection);

      await addDoc(subCollectionRef, {
        data: newItem,
        date: Timestamp.fromDate(new Date()),
      }).then(async () => {
        await updateDoc(teamDocRef, {
          total_points: increment(point ?? 0),
        }).then(() => {
          toast("Created successfully");
        });
      });
    } catch (error) {
      console.error("Error creating document: ", error);
      toast("Error creating document");
    } finally {
      setIsLoading(false);
      setIsAddOpen(false);
    }
  };

  return (
    <ProtectedDashboard>
      <div className="mb-10">
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
          data={
            searchText
              ? (searchedData as unknown as TableDataProps[])
              : tableData
          }
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
      </div>
    </ProtectedDashboard>
  );
};

export default DashBoard;
