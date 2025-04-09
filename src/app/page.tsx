"use client";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Container from "./components/Container";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Container />
      <Footer />
    </div>
  );
}
