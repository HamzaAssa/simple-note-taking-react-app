import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { NoteContext } from "../Providers/NoteProvider"; // Import the context

const TopBar = () => {
  const { notes, setNotes } = useContext(NoteContext); // Access the context to update notes
  const allNotes = JSON.parse(localStorage.getItem("notes")) || [];
  return (
    <div className="flex justify-between items-center wrap-anywhere">
      <div className="flex justify-between">
        <img className="w-8 h-8 mr-10" src={logo} alt="Logo" />
        <h1 className=" text-3xl font-semibold text-gray-600">MY NOTES</h1>
      </div>
      <input
        className="p-2 focus:outline-1 focus:outline-gray-400 focus:rounded-2xl rounded-0 focus:border-0 w-70 border-b-1 border-gray-400"
        type="text"
        placeholder="Search"
        onChange={(e) => {
          const searchTerm = e.target.value.toLowerCase();
          const filteredNotes = allNotes.filter(
            (note) =>
              note.title.toLowerCase().includes(searchTerm) ||
              note.content.toLowerCase().includes(searchTerm)
          );
          setNotes(filteredNotes);
        }}
      />

      <Link
        to="/Note"
        className="hover:bg-gray-200 text-gray-60 hover:text-blue-700 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer"
      >
        <span className="icon-[mdi--pen-plus] text-3xl font-extrabold"></span>
      </Link>
    </div>
  );
};

export default TopBar;
