import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";

import ComboBox from "../ui/ComboBox";
import { FormDataProps } from "../../types";
import { FormButtons, FormInput } from "../ui";
import { departmentData, itemsData, prizeData, teamData } from ".";

interface CreateEditItemProps {
  onOpen: boolean;
  onClose: (value: boolean) => void;
  onSave: (formData: FormDataProps) => void;
  isLoading: boolean;
  title: string;
  btnLabel: string;
  data?: FormDataProps;
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
  const [formData, setFormData] = useState<FormDataProps>({
    name: "",
    department: departmentData[0]?.name ?? "",
    team: teamData[0]?.name ?? "",
    item: itemsData[0]?.name ?? "",
    prize: prizeData[0]?.name ?? "",
  });

  useEffect(() => {
    setFormData(() => ({
      name: data?.name ?? "",
      department: data?.department ?? departmentData[0]?.name ?? "",
      team: data?.team ?? teamData[0]?.name ?? "",
      item: data?.item ?? itemsData[0]?.name ?? "",
      prize: data?.prize ?? prizeData[0]?.name ?? "",
    }));
  }, [data]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (
    property: keyof FormDataProps,
    selectedItem: { name: string }
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [property]: selectedItem?.name ?? "",
    }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  const closeModal = () => {
    onClose(false);
  };

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
                        value={{ name: formData.team }}
                        onChange={(selectedItem) =>
                          handleSelectChange("team", selectedItem)
                        }
                        data={teamData}
                        label="Select Team"
                        zIndex={5}
                        classLabel={styleCreateEditItem.classlabel}
                        classInput={styleCreateEditItem.classInput}
                        isloading={false}
                      />
                      <ComboBox
                        value={{ name: formData.department }}
                        onChange={(selectedItem) =>
                          handleSelectChange("department", selectedItem)
                        }
                        data={departmentData}
                        label="Select Department"
                        zIndex={5}
                        classLabel={styleCreateEditItem.classlabel}
                        classInput={styleCreateEditItem.classInput}
                        isloading={false}
                      />

                      <ComboBox
                        value={{ name: formData.item }}
                        onChange={(selectedItem) =>
                          handleSelectChange("item", selectedItem)
                        }
                        data={itemsData}
                        label="Select Item"
                        zIndex={5}
                        classLabel={styleCreateEditItem.classlabel}
                        classInput={styleCreateEditItem.classInput}
                        isloading={false}
                      />

                      <ComboBox
                        value={{ name: formData.prize }}
                        onChange={(selectedItem) =>
                          handleSelectChange("prize", selectedItem)
                        }
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
                    isLoading={isLoading}
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
