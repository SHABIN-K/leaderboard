import Fuse from "fuse.js";
import React, { ChangeEvent, useMemo } from "react";
import PropTypes from "prop-types";
import { TableDataProps } from "../types";

interface SearchInputProps {
  value?: string;
  data: TableDataProps[];
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  setSearchedData: React.Dispatch<
    React.SetStateAction<TableDataProps[] | undefined>
  >;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value = "",
  data,
  setSearchText,
  setSearchedData,
}) => {
  const fuse = useMemo(() => {
    return new Fuse(data as TableDataProps[], {
      keys: ["data.name", "data.department", "data.item"],
      threshold: 0.2,
    });
  }, [data]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);

    // Perform search and update the searched data
    const result = fuse.search(e.target.value).map((item) => item.item);
    setSearchedData(result || []);
  };

  return (
    <div className="m-12 lg:mx-8 sm:mx-2">
      <input
        type="search"
        className="h-14 w-full p-3 text-lg shadow focus:outline-none border-[3px] border-darkgrey rounded-lg font-medium text-lightblack font-codefont tracking-wide"
        placeholder="Search student Name or Item name"
        value={value}
        onChange={handleSearch}
      />
    </div>
  );
};

SearchInput.propTypes = {
  value: PropTypes.string,
  data: PropTypes.array.isRequired,
  setSearchText: PropTypes.func.isRequired,
  setSearchedData: PropTypes.func.isRequired,
};

export default SearchInput;
