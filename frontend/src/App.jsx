import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NewQuote from "./pages/NewQuote";
import Navbar from "./components/Navbar";
import { Box, Container } from "@mui/material";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<NewQuote />} />
        </Routes>
      </Container>
    </Router>
  );
}
