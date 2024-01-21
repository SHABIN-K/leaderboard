import { SetStateAction } from "react";
import { collection, getDocs } from "firebase/firestore";

import { TeamProps } from "../types";
import { db, fireConfig } from "../firebase/firebase";

const fetchTeam = async (setTeam: {
  (value: SetStateAction<TeamProps[]>): void;
  (arg0: TeamProps[]): void;
}) => {
  try {
    const querySnapshot = await getDocs(collection(db, fireConfig.collection));
    const teamsData = querySnapshot.docs.map((doc) => doc.data() as TeamProps);
    setTeam(teamsData);
  } catch (error) {
    console.error("Error fetching documents:", error);
  }
};

export { fetchTeam };
