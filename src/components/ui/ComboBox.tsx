import { Combobox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Dispatch, FC, Fragment, SetStateAction, useState } from "react";
import { WaitingLoader } from ".";

interface ComboBoxProps {
  value: { name: string };
  onChange: Dispatch<SetStateAction<{ name: string }>>;
  data: { name: string }[];
  label: string;
  zIndex: number;
  classLabel: string;
  classInput: string;
  isloading: boolean;
}

const ComboBox: FC<ComboBoxProps> = ({
  value,
  onChange,
  data,
  label,
  zIndex,
  classLabel,
  classInput,
  isloading,
}) => {
  const [query, setQuery] = useState("");

  const filteredData =
    query === ""
      ? data
      : data.filter((data) =>
          data.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="relative w-full lg:w-72">
      <Combobox value={value} onChange={onChange}>
        <Combobox.Label className={classLabel}>{label}</Combobox.Label>
        <div className="relative mt-1">
          <div className="relative w-full cursor-text overflow-hidden rounded-lg text-left border-black">
            <Combobox.Input
              className={classInput}
              displayValue={(data: { name: string }) => data.name}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-black"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>

          {isloading && (
            <div className="absolute inset-y-0 pl-8 flex items-center pr-2 text-black gap-2">
              <WaitingLoader size={15} color="#000000" />
              <span>Loading...</span>
            </div>
          )}

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options
              className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 sm:text-sm"
              style={{ zIndex: zIndex }}
            >
              {filteredData.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredData.map((data, index) => (
                  <Combobox.Option
                    key={index}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                        active ? "bg-blue-400 text-white" : "text-gray-900"
                      }`
                    }
                    value={data}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {data.name}
                        </span>
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default ComboBox;
