import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Integrantes from "./pages/Integrantes";
import IntegranteDetalhe from "./pages/IntegranteDetalhe";
import Sobre from "./pages/Sobre";
import FAQ from "./pages/FAQ";
import Contato from "./pages/Contato";

export default function App() {
  return (
    <div className="min-h-dvh flex flex-col bg-white text-slate-900">
      <Navbar />
      <main className="container mx-auto max-w-6xl flex-1 px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/integrantes" element={<Integrantes />} />
          <Route path="/integrantes/:rm" element={<IntegranteDetalhe />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}