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
      <section className="appSection">
        <div className="appContainer ">
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
  <div className="header">
    <h2>Pasc 2K24 Leaderboard</h2>
    <p>Check your rank here!</p>
    <p>
      Last updated on:
      <span>
        {new Date(data.lastUpdated).toLocaleString("en-US", {
          dateStyle: "full",
          timeStyle: "full",
        })}
      </span>
    </p>
  </div>
);

const HeroSection: React.FC = () => (
  <div className="heroSection">
    <TopCard />
    <TopCard />
    <TopCard />
    <TopCard />
  </div>
);

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => (
  <div className="searchInput">
    <input
      type="search"
      placeholder="Search for student Name"
      value={value}
      onChange={onChange}
    />
  </div>
);
