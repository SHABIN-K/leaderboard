import { SetStateAction } from "react";
import { collection, getDocs } from "firebase/firestore";

import { FormDataProps, TeamProps } from "../types";
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
  setTableDataa: (value: SetStateAction<FormDataProps[]>) => void
) => {
  try {
    // Fetch data from the main collection
    const mainCollectionSnapshot = await getDocs(
      collection(db, fireConfig.collection)
    );

    // Fetch data from subcollections
    const subcollectionDataPromises = mainCollectionSnapshot.docs.map(
      async (doc) => {
        const subCollectionSnapshot = await getDocs(
          collection(doc.ref, fireConfig.subCollection)
        );

        return subCollectionSnapshot.docs.map(
          (subDoc) => subDoc.data() as FormDataProps
        );
      }
    );

    const subcollectionData = await Promise.all(subcollectionDataPromises);

    // Combine main collection and subcollection data
    const allSubcollectionData = subcollectionData.flat() as FormDataProps[];
    const sortedData = allSubcollectionData.sort((a, b) =>
      a.date > b.date ? -1 : 1
    );
    setTableDataa(sortedData);
  } catch (error) {
    console.error("Error fetching documents:", error);
  }
};

export { fetchTeam, fetchStudent };
