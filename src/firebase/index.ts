import { SetStateAction } from "react";
import { collection, getDocs } from "firebase/firestore";

import { DatabaseData, TableDataProps, TeamProps } from "../types";
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

const fetchStudent = async (
  setTableDataa: (value: SetStateAction<TableDataProps[]>) => void
) => {
  try {
    const mainCollectionSnapshot = await getDocs(
      collection(db, fireConfig.collection)
    );

    const subcollectionDataPromises = mainCollectionSnapshot.docs.map(
      async (doc) => {
        const subCollectionSnapshot = await getDocs(
          collection(doc.ref, fireConfig.subCollection)
        );

        return subCollectionSnapshot.docs.map((subDoc) => {
          const data = subDoc.data() as DatabaseData;
          const date = new Date(data.date.seconds * 1000);
          return { ...data, date } as TableDataProps;
        });
      }
    );

    const subcollectionData = await Promise.all(subcollectionDataPromises);
    const allSubcollectionData =
      subcollectionData.flat() as unknown as TableDataProps[];

    const sortedData = allSubcollectionData.sort((a, b) =>
      a.date > b.date ? -1 : 1
    );

    setTableDataa(sortedData);
  } catch (error) {
    console.error("Error fetching documents:", error);
  }
};

export { fetchTeam, fetchStudent };
