import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./deleteModal";
import { NoteContext } from "../Providers/NoteProvider";

const NoteCard = ({ title, content, date, bgColor, id }) => {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { setNotes } = useContext(NoteContext); // Access the context to update notes
  return (
    <div>
      <div
        onClick={() => {
          navigate("/note", {
            state: {
              title: title,
              content: content,
              date: date,
              bgColor: bgColor,
              id: id,
            },
          });
        }}
        className={`w-55 max-h-70 bg-${bgColor}-300 my-2 mx-2 pb-2 pt-0 px-3
     text-gray-700 text-sm rounded-lg overflow-hidden shadow-md shadow-gray-400
      hover:shadow-lg hover:shadow-gray-500 transition-shadow 
      duration-300 ease-in-out cursor-pointer`}
      >
        <div className="flex justify-between items-center">
          <p>{date}</p>
          <div
            className={`hover:bg-${bgColor}-400 z-40 cursor-pointer p-1 rounded-full w-7 h-7 flex justify-center items-center`}
            onClick={(e) => {
              setIsDeleteModalOpen(true);
              e.stopPropagation(); // 👈 Stops the event from reaching parent
            }}
          >
            <span className="icon-[mdi--delete] text-xl font-bold"></span>
          </div>
        </div>
        <hr className="text-gray-400 mb-3" />
        <h2 className="text-md font-semibold">
          {title.length > 30 ? title.substring(0, 30) + "..." : title}
        </h2>
        <p className="text-md mt-1">
          {content.length > 200 ? content.substring(0, 200) + "..." : content}
        </p>
      </div>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <h2 className="text-lg font-semibold mb-4">Confirm Delete?</h2>
        <p>Are you sure you want to delete this note?</p>
        <div className="flex justify-end mt-8">
          <button
            onClick={() => {
              // Get the current notes from local storage
              let notes = JSON.parse(localStorage.getItem("notes")) || [];
              // Filter out the note with the same id
              notes = notes.filter((oldNote) => oldNote.id !== id);
              setNotes(notes); // Update the context state
              // Save the updated notes to local storage
              localStorage.setItem("notes", JSON.stringify(notes));
              // Close the modal
              setIsDeleteModalOpen(false);
            }}
            className="bg-red-600 hover:bg-red-700 cursor-pointer text-white px-4 py-2 rounded-lg mr-2"
          >
            Delete
          </button>
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className="bg-gray-600 hover:bg-gray-700 cursor-pointer text-gray-100 px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </DeleteModal>
    </div>
  );
};

export default NoteCard;
