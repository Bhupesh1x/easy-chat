"use client";

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

type Props = {
  isOpen?: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  title?: string;
};

const RightModal = ({ isOpen, onClose, children, title }: Props) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  useEffect(() => {
    const onkeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", onkeyDown);

    return () => {
      window.removeEventListener("keydown", onkeyDown);
    };
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="
          overflow-x-hidden 
          overflow-y-auto 
          fixed 
          inset-0 
          z-50 
          outline-none 
          focus:outline-none
          bg-neutral-800/70
        "
      >
        <div
          className="
          relative 
          h-full w-full
          "
        >
          {/*content*/}
          <div
            className={`
            translate
            duration-500
            h-full
            w-full
            ${showModal ? "translate-x-0" : "translate-x-full"}
            ${showModal ? "opacity-100" : "opacity-0"}
          `}
          >
            <div className="absolute right-0 h-full w-[20rem]">
              <div
                className="
              translate
              h-full
              border-0 
              rounded-md
              shadow-lg 
              flex 
              flex-col 
              w-full 
              bg-white 
              outline-none 
              focus:outline-none
            "
              >
                {/*header*/}
                <div
                  className="
                flex 
                items-center 
                p-3
                rounded-t
                justify-center
                relative
                "
                >
                  <button
                    className="p-1 border-0  hover:opacity-70 transition absolute right-4 top-2"
                    onClick={handleClose}
                  >
                    <IoMdClose size={18} />
                  </button>
                  <div className="text-lg font-semibold">{title}</div>
                </div>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RightModal;
