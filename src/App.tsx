/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";

import "./App.css";
import data from "./utils/data.json";
import { Table, TopCard } from "./components";
import { generateConfetti } from "./utils/generateConfetti";

interface AppProps {}

interface SearchInputProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const App: React.FC<AppProps> = () => {
  const [tableData, setTableData] = useState("");
  const [searchText, setSearchText] = useState("");
  // const [searchedData, setSearchedData] = useState<TableDataType[]>();

  const handleSearch = () => {
    console.log("no data found");
  };

  useEffect(() => {
    generateConfetti();
  }, []);

  return (
    <>
      <section className="relative mx-auto mt-32 mb-12">
        <div className="px-5 lg:px-0">
          <Header />
          <HeroSection />
          <SearchInput value={searchText} onChange={handleSearch} />
          <Table />
        </div>
      </section>
    </>
  );
};

export default App;

const Header: React.FC = () => (
  <div className="relative my-10 mx-auto flex justify-center items-center flex-col text-center lg:mx-8 sm:mx-2">
    <h2 className="my-1.5 pt-0 px-2 pb-2 font-['Blanka'] text-[2rem] font-bold text-lightblack tracking-[4px] rounded-lg bg-[rgba(255,255,255,0.8)] shadow-[0_0_4px_rgba(50,69,107,0.2)] md:text-[1rem]">
      Pasc 2K24 Leaderboard
    </h2>
    <p className="my-4 font-codefont text-2xl font-medium text-lightblack tracking-wide">
      Check your rank here!
    </p>
    <p className="my-2 font-codefont text-lg font-medium text-lightblack tracking-wide">
      Last updated on:
      <span className="mx-0.5 font-curlfont font-bold text-primarydark italic">
        {new Date(data.lastUpdated).toLocaleString("en-US", {
          dateStyle: "full",
          timeStyle: "full",
        })}
      </span>
    </p>
  </div>
);

const HeroSection: React.FC = () => (
  <div className="relative my-10 px-12 flex justify-center items-center gap-8 lg:px-8 sm:px-2 md:flex-col">
    <TopCard />
    <TopCard />
    <TopCard />
    <TopCard />
  </div>
);

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => (
  <div className="my-12 mx-12 lg:mx-8 sm:mx-2">
    <input
      type="search"
      className="h-14 w-full px-3 py-3 font-codefont text-lg text-lightblack font-medium shadow focus:outline-none border-[3px] border-darkgrey tracking-wider rounded-lg"
      placeholder="Search for student Name"
      value={value}
      onChange={onChange}
    />
  </div>
);
