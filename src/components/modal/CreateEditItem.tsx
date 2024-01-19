"use client";

import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FaXmark } from "react-icons/fa6";
import { FormButtons, FormInput, WaitingLoader } from "../ui";

const CreateEditItem = ({
  isOpen,
  onClose,
  onSave,
  isLoading,
  title,
  btnLabel,
  data,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    about: "",
    email: "",
    phonenumber: "",
    location: "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        name: data?.name || "",
        userName: data?.userName || "",
        about: data?.about || "",
        email: data?.email || "",
        phonenumber: data?.phoneNumber || "",
        location: data?.location || "",
      });
    } else {
      setFormData({
        name: "",
        userName: "",
        about: "",
        email: "",
        phonenumber: "",
        location: "",
      });
    }
  }, [data]);

  const handleInputChange = (e) => {
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
    <Transition appear show={isOpen} as={Fragment}>
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
              <Dialog.Panel className="w-full max-w-sm transform rounded-2xl bg-white dark:bg-gray-800 py-2 transition-all cursor-default pointer-events-auto mx-auto relative shadow-xl">
                <div className="absolute top-2 right-2 rtl:right-auto rtl:left-2 ">
                  <FaXmark  className="icon" onClick={closeModal} />
                </div>

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
                        label="Name"
                        type="text"
                        name="name"
                        value={formData.name}
                        placeholder="Enter your shop name"
                        onChange={handleInputChange}
                        classLabel="label_form"
                        classInput="input_form"
                      />
                      <FormInput
                        label="User name"
                        type="text"
                        name="userName"
                        value={
                          formData.userName
                            ? formData.userName.toLowerCase().trim()
                            : ""
                        }
                        placeholder="Enter your shop user name"
                        onChange={handleInputChange}
                        classLabel="label_form"
                        classInput="input_form"
                      />
                      <>
                        <label className="label_form">About</label>
                        <textarea
                          name="about"
                          rows="2"
                          className="input_form"
                          placeholder="Write Shop description here"
                          value={formData.about}
                          onChange={handleInputChange}
                        />
                      </>
                      <FormInput
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        placeholder="Enter shop email"
                        onChange={handleInputChange}
                        classLabel="label_form"
                        classInput="input_form"
                      />
                      <FormInput
                        label="Contact Number"
                        type="tel"
                        name="phonenumber"
                        value={formData.phonenumber}
                        onChange={handleInputChange}
                        classLabel="label_form"
                        classInput="input_form"
                      />
                      <FormInput
                        label="Location"
                        type="text"
                        name="location"
                        value={formData.location}
                        placeholder="No 43,Road name,city"
                        onChange={handleInputChange}
                        classLabel="label_form"
                        classInput="input_form"
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
                    primaryLabel={
                      isLoading ? (
                        <WaitingLoader size={15} color="#fffff" />
                      ) : (
                        btnLabel
                      )
                    }
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
