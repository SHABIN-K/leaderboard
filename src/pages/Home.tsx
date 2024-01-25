import React, { useEffect, useState } from "react";

import { Loader } from "../components/ui";
import { TableDataProps, TeamProps } from "../types";
import { fetchStudent, fetchTeam } from "../firebase";
import { SearchInput, Table, TopCard } from "../components";
import { generateConfetti } from "../utils/generateConfetti";
import { useTableStore, useTeamStore } from "../utils/store";

interface AppProps {}

const styleApp = {
  font: "font-medium text-lightblack font-codefont tracking-wide",
};

const Header: React.FC<{ lastUpdatedDate: TableDataProps[] }> = ({
  lastUpdatedDate,
}) => {
  const firstItemDate =
    lastUpdatedDate.length > 0 ? new Date(lastUpdatedDate[0].date) : null;

  return (
    <div className="relative my-10 mx-auto flex-center flex-col text-center lg:mx-8 sm:mx-2">
      {/* <h2 className="my-1.5 pt-0 px-2 pb-2 font-['sadhise'] text-[5rem] font-bold text-lightblack tracking-[4px] rounded-lg md:text-[3rem]">
        Kalaavathara 2k24
  </h2>*/}

        <img
          src="/logo_art.png"
          alt="logo arts "
          className="w-[450px] h-full user_image"
        />
 
     
      {firstItemDate !== null ? (
        <p className={`my-2 text-lg ${styleApp.font}`}>
          Last updated on:
          <span className="mx-0.5 font-curlfont font-bold text-primarydark italic">
            {firstItemDate.toLocaleString("en-US", {
              dateStyle: "long",
              timeStyle: "short",
            })}
          </span>
        </p>
      ) : (
        <p className={`my-2 text-lg ${styleApp.font}`}>
          Last updated date not available.
        </p>
      )}
    </div>
  );
};

const HeroSection: React.FC<{ team: TeamProps[] }> = ({ team }) => {
  const sortedTeamCard = [...team].sort(
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
  const { setTable } = useTableStore();
  const { setTeam: setTeamData } = useTeamStore();
  const [isLoading, setIsLoading] = useState(false);

  const [team, setTeam] = useState<TeamProps[]>([]);
  const [tableData, setTableData] = useState<TableDataProps[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [searchedData, setSearchedData] = useState<
    TableDataProps[] | undefined
  >();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        if (team.length === 0) {
          await fetchTeam(setTeam);
          await fetchStudent(setTableData);
        } else {
          setTable(tableData);
          setTeamData(team);
          generateConfetti();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [setTable, setTeamData, tableData, team]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="relative mx-auto mt-24 mb-12">
          <div className="px-5 lg:px-0">
            <Header lastUpdatedDate={tableData} />
            <HeroSection team={team} />
            <SearchInput
              value={searchText}
              data={tableData}
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
          </div>
        </section>
      )}
    </>
  );
};

export default Home;
