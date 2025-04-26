import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Note from "./pages/Note";
import NoPage from "./pages/NoPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Note" element={<Note />} />
        <Route path="/*" element={<NoPage />} />
      </Routes>
    </Router>
  );
};

export default App;
