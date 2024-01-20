"use client";

import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";

import ComboBox from "../ui/ComboBox";
import { FormButtons, FormInput } from "../ui";
import { departmentData, itemsData, prizeData, teamData } from ".";

interface CreateEditItemProps {
  onOpen: boolean;
  onClose: (value: boolean) => void;
  onSave: (
    formData: FormData,
    setFormData: React.Dispatch<React.SetStateAction<FormData>>
  ) => void;
  isLoading: boolean;
  title: string;
  btnLabel: string;
  data?: FormData;
}

interface FormData {
  name: string;
  department: string;
  team: string;
  item: string;
  prize: string;
}

const styleCreateEditItem = {
  classlabel: "text-black font-medium md:font-semibold",
  classInput:
    "w-full bg-gray-100 py-2 pl-3 pr-10 text-sm text-black font-medium",
};

const CreateEditItem: React.FC<CreateEditItemProps> = ({
  onOpen,
  onClose,
  onSave,
  isLoading,
  title,
  btnLabel,
  data,
}) => {
  const [team, setTeam] = useState(teamData[0]);
  const [department, setDepartment] = useState(departmentData[0]);
  const [item, setItem] = useState(itemsData[0]);
  const [rank, setRank] = useState(prizeData[0]);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    department: "",
    team: "",
    item: "",
    prize: "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        name: data?.name || "",
        department: data?.department || "",
        team: data?.team || "",
        item: data?.item || "",
        prize: data?.prize || "",
      });
    } else {
      setFormData({
        name: "",
        department: "",
        team: "",
        item: "",
        prize: "",
      });
    }
  }, [data]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  function handleSave() {
    onSave(formData, setFormData);
  }
  function closeModal() {
    onClose(false);
  }

  return (
    <Transition appear show={onOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-white/25 dark:bg-black/25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 min-h-full overflow-y-auto overflow-x-hidden transition flex items-center">
          <div className="relative w-full cursor-pointer pointer-events-none transition my-auto p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-sm transform rounded-2xl bg-white py-2 transition-all cursor-default pointer-events-auto mx-auto relative shadow-xl">
                <div className="p-2 md:mx-3">
                  <div className="p-2 text-start text-color">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-bold tracking-tight"
                    >
                      {title}
                    </Dialog.Title>
                  </div>
                  <div className="p-1">
                    <div className="flex flex-col space-y-1">
                      <FormInput
                        mainClass="relative"
                        type="text"
                        name="name"
                        value={formData.name}
                        placeholder="Enter student name"
                        onChange={handleInputChange}
                        classInput="input_form"
                      />
                      <ComboBox
                        value={team}
                        onChange={setTeam}
                        data={teamData}
                        label="Select Team"
                        zIndex={5}
                        classLabel={styleCreateEditItem.classlabel}
                        classInput={styleCreateEditItem.classInput}
                        isloading={false}
                      />
                      <ComboBox
                        value={department}
                        onChange={setDepartment}
                        data={departmentData}
                        label="Select Department"
                        zIndex={5}
                        classLabel={styleCreateEditItem.classlabel}
                        classInput={styleCreateEditItem.classInput}
                        isloading={false}
                      />
                      <ComboBox
                        value={item}
                        onChange={setItem}
                        data={itemsData}
                        label="Select Item"
                        zIndex={5}
                        classLabel={styleCreateEditItem.classlabel}
                        classInput={styleCreateEditItem.classInput}
                        isloading={false}
                      />
                      <ComboBox
                        value={rank}
                        onChange={setRank}
                        data={prizeData}
                        label="Select Rank"
                        zIndex={5}
                        classLabel={styleCreateEditItem.classlabel}
                        classInput={styleCreateEditItem.classInput}
                        isloading={false}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end items-end px-3 py-2">
                  <FormButtons
                    mainClass="flex space-x-1"
                    primaryClass="btn_form"
                    secondaryClass="btn_form"
                    secondaryLabelClass="flex items-center"
                    primaryLabelClass="flex items-center"
                    primaryLabel={isLoading ? "Loading..." : btnLabel}
                    secondaryLabel="cancel"
                    onPrimaryClick={handleSave}
                    onSecondaryClick={closeModal}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CreateEditItem;
