import React, { Fragment } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Dialog, Transition } from "@headlessui/react";

import { WaitingLoader } from "../ui";

interface ConfirmModalProps {
  onOpen: boolean;
  onClose: (value: boolean) => void;
  onConfirm: () => void;
  isLoading: boolean;
  title: string;
  btnLabel: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  onOpen,
  onClose,
  onConfirm,
  isLoading,
  title,
  btnLabel,
}) => {
  function closeModal() {
    onClose(false);
  }

  const styleConfirmModel = {
    btn: "inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none min-h-[2.25rem] px-4 text-sm",
    btnLabel: "flex items-center gap-1",
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
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
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
                <div className="absolute top-2 right-2 rtl:right-auto rtl:left-2">
                  <XMarkIcon className="icon" onClick={closeModal} />
                </div>

                <div className="space-y-2 p-2">
                  <div className="p-4 space-y-2 text-center text-black">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-bold tracking-tight"
                    >
                      {title}
                    </Dialog.Title>

                    <p className="text-gray-500">
                      Are you sure you would like to do this?
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="border-t px-2" />

                  <div className="px-6 py-2">
                    <div className="grid gap-2 grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
                      <button
                        onClick={closeModal}
                        className={`text-gray-800 bg-white hover:bg-gray-50 border-gray-300 ${styleConfirmModel.btn}`}
                      >
                        <span className={styleConfirmModel.btnLabel}>
                          Cancel
                        </span>
                      </button>

                      <button
                        onClick={onConfirm}
                        className={`text-white shadow focus:ring-white border-transparent bg-red-600 hover:bg-red-500 focus:bg-red-700 focus:ring-offset-red-700 ${styleConfirmModel.btn}`}
                      >
                        <span className={styleConfirmModel.btnLabel}>
                          {isLoading ? (
                            <WaitingLoader size={15} color="#fffff" />
                          ) : (
                            btnLabel
                          )}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ConfirmModal;
