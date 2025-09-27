"use client";

import { useState } from "react";
import { Icon, Menu, X } from "lucide-react";
import SidebarData from "./SidebarData";
import { link } from "fs";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* モバイルヘッダー */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white shadow flex items-center justify-between px-4 z-20">
        <h1 className="text-lg font-bold">Instant Order</h1>
        <button onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* サイドバー */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-white shadow-lg flex flex-col transform transition-transform duration-300 z-30
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="h-16 flex items-center justify-center border-b">
          <h1 className="text-xl font-bold">Instant Order</h1>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {SidebarData.map((data, index) => {
							return (
								<li>
									<a
										href={data.link}
										className="block px-3 py-2 rounded-lg hover:bg-gray-200"
										onClick={() => setOpen(false)}
									>
										{data.title}
									</a>
								</li>
							)
						})}
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar