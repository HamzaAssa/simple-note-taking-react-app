import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ColorSelectionBox from "../components/ColorSelectionBox";
import DeleteModal from "../components/deleteModal";

const Note = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [bgColor, setBgColor] = useState(
    location.state ? location.state.bgColor : "green"
  );
  const [note, setNote] = useState(
    location.state || {
      id: "",
      title: "",
      content: "",
      date: new Date().toLocaleDateString(),
      bgColor: bgColor,
    }
  );

  const titleRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.height = "auto";
      titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
    }
    if (contentRef.current) {
      contentRef.current.style.height = "auto";
      contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
    }
  }, []);

  return (
    <div>
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
              notes = notes.filter((oldNote) => oldNote.id !== note.id);
              // Save the updated notes to local storage
              localStorage.setItem("notes", JSON.stringify(notes));
              // Navigate to the home page
              setIsDeleteModalOpen(false);
              navigate("/");
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
      <div
        className={`w-screen h-screen bg-${bgColor}-300 pb-5 px-3
      text-gray-900 flex flex-col justify-start items-`}
      >
        <div className="flex justify-between items-center py-1">
          <p className="text-gray-500 text-sm">{note.date}</p>
          <button
            onClick={() => {
              setIsDeleteModalOpen(true);
            }}
            className={`hover:shadow-md shadow-gray-400 text-gray-800
              rounded-full w-10 h-10 flex justify-center items-center cursor-pointer`}
          >
            <span className="icon-[mdi--delete] text-2xl font-bold"></span>
          </button>
        </div>
        <hr className="text-gray-400" />
        <textarea
          className="my-3 text-lg font-bold placeholder:text-gray-700 focus:outline-none w-full resize-none h-auto"
          value={note.title}
          name="title"
          ref={titleRef}
          rows="1"
          onChange={(e) => setNote({ ...note, title: e.target.value })}
          placeholder="Enter Title"
          onInput={(e) => {
            e.target.style.height = "auto";
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
        ></textarea>
        <textarea
          className="text-md font-normal placeholder:text-gray-700 focus:outline-none w-full resize-none h-auto"
          placeholder="Note content"
          value={note.content}
          name="content"
          ref={contentRef}
          rows="1"
          onChange={(e) => setNote({ ...note, content: e.target.value })}
          onInput={(e) => {
            e.target.style.height = "auto";
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
        ></textarea>
        <div className="mt-auto px-10 w-full flex justify-between items-center">
          <div className="flex justify-start items-center gap-2">
            <ColorSelectionBox bgColor={"green"} setBgColor={setBgColor} />
            <ColorSelectionBox bgColor={"red"} setBgColor={setBgColor} />
            <ColorSelectionBox bgColor={"blue"} setBgColor={setBgColor} />
            <ColorSelectionBox bgColor={"amber"} setBgColor={setBgColor} />
            <ColorSelectionBox bgColor={"emerald"} setBgColor={setBgColor} />
            <ColorSelectionBox bgColor={"orange"} setBgColor={setBgColor} />
            <ColorSelectionBox bgColor={"teal"} setBgColor={setBgColor} />
            <ColorSelectionBox bgColor={"gray"} setBgColor={setBgColor} />
          </div>
          <button
            onClick={(e) => {
              // Get the current notes from local storage
              let notes = JSON.parse(localStorage.getItem("notes")) || [];
              notes = notes.filter((oldNote) => oldNote.id !== note.id);
              // If the note is new, add it to the notes array
              notes.push({ ...note, id: Date.now(), bgColor: bgColor });
              localStorage.setItem("notes", JSON.stringify(notes));
              // Clear the note state
              setNote({
                id: "",
                title: "",
                content: "",
                date: "",
                bgColor: "",
              });
              // Navigate to the home page
              navigate("/");
            }}
            className="bg-blue-700 text-white hover:bg-blue-800 text-gray-60 
            rounded-xl w-15 h-12 flex justify-center items-center cursor-pointer"
          >
            <span className="icon-[mdi--check] text-3xl font-extrabold"></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Note;
