import React from "react";
import Link from "next/link";

export const NavBar = () => {
    return (
        <nav className="flex justify-center bg-[#00ff00] border-b">
            <div className="container flex justify-between items-center py-4">
                <div className="logo">
                    Logo
                </div>
                <ul className="flex flex-row gap-4">
                    <Link href="/" className="nav-link">
                        Home
                    </Link>
                    <Link href="/boards" className="nav-link">
                        My Boards
                    </Link>
                    <Link href="/profile" className="nav-link">
                        Profile
                    </Link>
                    <Link href="/login" className="nav-link">
                        Login
                    </Link>
                    <Link href="/register" className="nav-link">
                        Register
                    </Link>
                </ul>
            </div>
        </nav>
    )
};