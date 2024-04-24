import React from "react";
import Link from "next/link";

export const NavBar = () => {
    return (
        <nav className="flex justify-center items-center bg-[#00ff00] border-b">
            <div className="container flex justify-between py-3">
                <div className="logo">
                    Logo
                </div>
                <div className="linkies">
                    <ul className="flex flex-col ">
                        <li>
                            <Link href="/" className="sidebar-link px-2">
                                Home
                            </Link>
                            <Link href="/board" className="sidebar-link px-2">
                                Board
                            </Link>
                            <Link href="/" className="sidebar-link px-2">
                                Home
                            </Link>
                            <Link href="/" className="sidebar-link ps-2">
                                Login
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
};