import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Table } from "../components";
import { useTableStore, useTeamStore } from "../utils/store";
import { TableDataProps, TeamProps } from "../types";
import { Loader } from "../components/ui";

const ViewScore = () => {
  const navigate = useNavigate();
  const { id: title } = useParams<{ id: string }>();
  const { table } = useTableStore();
  const { team } = useTeamStore();

  const [selectedTeam, setSelectedTeam] = useState<TeamProps | null>(null);
  const [selectedItems, setSelectedItems] = useState<TableDataProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teamFound = team.find((team) => team.link === title);
        setSelectedTeam(teamFound || null);

        if (selectedTeam) {
          const itemsFound = table.filter(
            (item) => item.data.team === selectedTeam.name
          );
          setSelectedItems(itemsFound);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast("An error occurred while fetching data.");
      }
    };

    fetchData();
  }, [title, team, table, selectedTeam]);


  useEffect(() => {
    if (!table.length || !team.length) {
      navigate("/");
    }
  }, [table, team, navigate]);

  if (!selectedTeam || !selectedItems.length) {
    return <Loader />;
  }

  return (
    <section className="relative mx-auto mt-10 mb-12">
      <div className="px-5 lg:px-0">
        <h2 className="font-mallufont text-[3rem] md:text-[2rem] text-lightblack text-center">
          {selectedTeam ? selectedTeam.name : ""}
        </h2>
        <Table data={selectedItems} />
      </div>
    </section>
  );
};

export default ViewScore;
