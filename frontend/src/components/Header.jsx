import React from "react";
import { Link } from "react-router-dom";

function Header() {
	return (
		<header className="bg-white shadow-md">
			<div className="flex justify-between p-3">
				<Link to="/">
					<h1 className="font-bold flex flex-wrap shadow-md">
						<span className="text-2xl bg-gradient-to-r from-emerald-500 to-emerald-900 bg-clip-text text-transparent">TruyenTongHop</span>
					</h1>
				</Link>
			</div>
		</header>
	);
}

export default Header;
