import React from "react";
import { Link } from "react-router-dom";

function Footer() {
	return (
		<footer className="bg-gray-800 fixed bottom-0 left-0 ax-w-7xl right-0 p-3 text-white min-h-[240px] z-[2]">
			<div className="flex flex-col sm:flex-row mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
				<div className="w-full lg:w-[30%] px-4">
					<Link to={"/"}>
						<h1 className="text-3xl mb-3 font-bold bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">TruyenTongHop</h1>
					</Link>
					<p>Email: tbquanganh@gmail.com</p>
					<p className="text-justify">
						Mọi thông tin và hình ảnh trên website đều được sưu tầm trên Internet. Chúng tôi không sở hữu hay chịu trách nhiệm bất kỳ thông tin nào trên web này. Nếu làm ảnh hưởng đến cá
						nhân hay tổ chức nào, khi được yêu cầu, chúng tôi sẽ xem xét và gỡ bỏ ngay lập tức.
					</p>
				</div>
				{/* END: Left side */}
				<div className="w-full lg:w-[70%] flex flex-col px-4">
					<h2 className="text-xl font-bold mb-3">Từ khóa</h2>
					<div className="keyword-list w-full">
						<ul className="flex flex-wrap gap-x-2 gap-y-5">
							<li>
								<a href="" className="text-sm text-black hover:opacity-95 p-2 bg-slate-300 rounded-[20px]">
									Truyện tranh
								</a>
							</li>
							<li>
								<a href="" className="text-sm text-black hover:opacity-95 p-2 bg-slate-300 rounded-[20px]">
									Truyện tranh online
								</a>
							</li>
							<li>
								<a href="" className="text-sm text-black hover:opacity-95 p-2 bg-slate-300 rounded-[20px]">
									Đọc truyện tranh
								</a>
							</li>
							<li>
								<a href="" className="text-sm text-black hover:opacity-95 p-2 bg-slate-300 rounded-[20px]">
									Truyện tranh mới
								</a>
							</li>
							<li>
								<a href="" className="text-sm text-black hover:opacity-95 p-2 bg-slate-300 rounded-[20px]">
									Truyện tranh hay
								</a>
							</li>
							<li>
								<a href="" className="text-sm text-black hover:opacity-95 p-2 bg-slate-300 rounded-[20px]">
									Manga
								</a>
							</li>
							<li>
								<a href="" className="text-sm text-black hover:opacity-95 p-2 bg-slate-300 rounded-[20px]">
									Hanhua
								</a>
							</li>
							<li>
								<a href="" className="text-sm text-black hover:opacity-95 p-2 bg-slate-300 rounded-[20px]">
									Truyện ngôn tình
								</a>
							</li>
							<li>
								<a href="" className="text-sm text-black hover:opacity-95 p-2 bg-slate-300 rounded-[20px]">
									nettruyen
								</a>
							</li>
							<li>
								<a href="" className="text-sm text-black hover:opacity-95 p-2 bg-slate-300 rounded-[20px]">
									tryenqq
								</a>
							</li>
							<li>
								<a href="" className="text-sm text-black hover:opacity-95 p-2 bg-slate-300 rounded-[20px]">
									tryenqq
								</a>
							</li>
							<li>
								<a href="" className="text-sm text-black hover:opacity-95 p-2 bg-slate-300 rounded-[20px]">
									tryenqq
								</a>
							</li>
							<li>
								<a href="" className="text-sm text-black hover:opacity-95 p-2 bg-slate-300 rounded-[20px]">
									tryenqq
								</a>
							</li>
							<li>
								<a href="" className="text-sm text-black hover:opacity-95 p-2 bg-slate-300 rounded-[20px]">
									tryenqq
								</a>
							</li>
						</ul>
					</div>
				</div>
				{/* END: Right side */}
			</div>
		</footer>
	);
}

export default Footer;
