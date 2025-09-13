import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Intro from "./pages/Intro.jsx";
import Quiz from "./pages/Quiz.jsx";

export default function App(){
  return (
    <div className="app">
      <Header />
      <main className="main container">
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}