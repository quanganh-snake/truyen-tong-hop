import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";

function App() {
	return (
		<BrowserRouter>
			<Header />
			<main className="mt-[64px] mb-[240px] mx-auto max-w-7xl py-7 px-2 sm:px-6 lg:px-8  z-[1]">
				<Routes>
					<Route path="/" element={<Home />} />
				</Routes>
			</main>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
