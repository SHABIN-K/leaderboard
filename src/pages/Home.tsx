/* eslint-disable @typescript-eslint/no-unused-vars */
import Fuse from "fuse.js";
import React, { ChangeEvent, useEffect, useState } from "react";

import { teamCard } from "../utils";
import data from "../utils/data.json";
import { SearchInput, Table, TopCard } from "../components";
import { generateConfetti } from "../utils/generateConfetti";
import { TableDataType } from "../types";

interface AppProps {}

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

const Home: React.FC<AppProps> = () => {
  const [tableData, setTableData] = useState<TableDataType[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [searchedData, setSearchedData] = useState<
    TableDataType[] | undefined
  >();

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
          <SearchInput value={searchText}  setSearchText={setSearchText} setSearchedData={setSearchedData}/>
          <Table
            data={searchText ? (searchedData as TableDataType[]) : tableData}
          />
        </div>
      </section>
    </>
  );
};

export default Home;
