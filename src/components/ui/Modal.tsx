"use client";

import { ReactNode } from "react";
import Button from "./Button";

interface Iprops {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, onConfirm, title, children }: Iprops) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="mb-6">{children}</div>
        <div className="flex justify-end space-x-4">
          <Button onClick={onClose} className=" bg-gray-500 hover:bg-gray-600 ">
            Cancel
          </Button>
          <Button onClick={onConfirm} className=" bg-red-500 hover:bg-red-600 ">
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
