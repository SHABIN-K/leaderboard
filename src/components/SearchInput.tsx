import Fuse from "fuse.js";
import React, { ChangeEvent } from "react";

import data from "../utils/data.json";
import { TableDataType } from "../types";

interface SearchInputProps {
  value?: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  setSearchedData: React.Dispatch<
    React.SetStateAction<TableDataType[] | undefined>
  >;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value = "",
  setSearchText,
  setSearchedData,
}) => {
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
  return (
    <div className="m-12 lg:mx-8 sm:mx-2">
      <input
        type="search"
        className="h-14 w-full p-3 text-lg shadow focus:outline-none border-[3px] border-darkgrey rounded-lg font-medium text-lightblack font-codefont tracking-wide"
        placeholder="Search for student Name"
        value={value}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchInput;
