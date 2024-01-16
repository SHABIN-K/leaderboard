/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ChangeEvent, useEffect, useState } from "react";
import Fuse from "fuse.js";

import { teamCard } from "./utils";
import data from "./utils/data.json";
import { Table, TopCard } from "./components";
import { generateConfetti } from "./utils/generateConfetti";

interface AppProps {}

interface SearchInputProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

interface TableDataType {
  user_name: string;
  avatar_url: string;
  user_url: string;
  total_points: number;
  full_name: string;
  college: string;
  rank: number;
}


const styleApp = {
  font: "font-medium text-lightblack font-codefont tracking-wide",
};

const Header: React.FC = () => (
  <div className="relative my-10 mx-auto flex-center flex-col text-center lg:mx-8 sm:mx-2">
    <h2 className="my-1.5 pt-0 px-2 pb-2 font-['sadhise'] text-[5rem] font-bold text-lightblack tracking-[4px] rounded-lg md:text-[3rem]">
    Kalaavathara 2k24
    </h2>
    <p className={`my-4 text-2xl ${styleApp.font}`}>Check your rank here!</p>
    <p className={`my-2 text-lg ${styleApp.font}`}>
      Last updated on:
      <span className="mx-0.5 font-curlfont font-bold text-primarydark italic">
        {new Date(data.lastUpdated).toLocaleString("en-US", {
          dateStyle: "full",
          timeStyle: "short",
        })}
      </span>
    </p>
  </div>
);

const HeroSection: React.FC = () => {
  const sortedTeamCard = [...teamCard].sort(
    (a, b) => b.total_points - a.total_points
  );

  return (
    <div className="relative my-10 px-12 flex-center gap-8 lg:px-8 sm:px-2 md:flex-col">
      {sortedTeamCard.map((team, index) => (
        <TopCard key={index} teamData={{ ...team, rank: index + 1 }} />
      ))}
    </div>
  );
};

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => (
  <div className="m-12 lg:mx-8 sm:mx-2">
    <input
      type="search"
      className={`h-14 w-full p-3 text-lg shadow focus:outline-none border-[3px] border-darkgrey rounded-lg ${styleApp.font}r`}
      placeholder="Search for student Name"
      value={value}
      onChange={onChange}
    />
  </div>
);

const App: React.FC<AppProps> = () => {
  const [tableData, setTableData] = useState<TableDataType[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [searchedData, setSearchedData] = useState<
    TableDataType[] | undefined
  >();

  const handleSearch = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearchText(e.target.value);
    const fuse = new Fuse(data.data as TableDataType[], {
      keys: ["user_name", "full_name", "college"],
      threshold: 0.2,
    });
    const result = fuse.search(e.target.value).map((item) => item.item);
    setSearchedData(result);
  };

  useEffect(() => {
    generateConfetti();
    setTableData(data.data);
  }, []);

  return (
    <>
      <section className="relative mx-auto mt-24 mb-12">
        <div className="px-5 lg:px-0">
          <Header />
          <HeroSection />
          <SearchInput value={searchText} onChange={handleSearch} />
          <Table
            data={searchText ? (searchedData as TableDataType[]) : tableData}
          />
        </div>
      </section>
    </>
  );
};

export default App;
