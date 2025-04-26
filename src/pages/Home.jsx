import React, { useContext, useState } from "react";
import TopBar from "../components/TopBar";
import NoteCard from "../components/NoteCard";
import { NoteProvider, NoteContext } from "../Providers/NoteProvider";

const HomeContent = () => {
  const { notes } = useContext(NoteContext);

  return (
    <>
      <TopBar />
      <div className="flex justify-start items-start gap-3 my-20 bg-gray-200 p-3 rounded-3xl">
        {notes.length === 0 ? (
          <div className="mx-auto flex justify-center items-center col-span-3 h-[60vh]">
            <span className="icon-[mdi--note-outline] text-5xl text-gray-500"></span>
            <p className="text-gray-500 text-lg font-semibold">
              No notes found
            </p>
          </div>
        ) : (
          notes.map((element) => (
            <NoteCard
              key={element.id}
              title={element.title}
              content={element.content}
              date={element.date}
              bgColor={element.bgColor}
              id={element.id}
            />
          ))
        )}
      </div>
    </>
  );
};

const Home = () => {
  return (
    <main className="py-4 px-30">
      <NoteProvider>
        <HomeContent />
      </NoteProvider>
    </main>
  );
};

export default Home;
