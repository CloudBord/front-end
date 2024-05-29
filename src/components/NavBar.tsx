import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Login from "@/components/Login";
import Logout from "@/components/Logout";

import React from "react";
import Link from "next/link";

export async function RenderUserManagement(){
    const session = await getServerSession(authOptions)
    if(session){
        return(
            <>
                <div className="nav-link">
                    Hello {session.user?.name}!
                </div>
                <Link href="/boards" className="nav-link">
                    My Boards
                </Link>
                <Link href="/profile" className="nav-link">
                    Profile
                </Link>
                <div className="nav-link">
                    <Logout />
                </div>
            </>
        )
    }
    return(
        <>
            {/* <Link href="/register" className="nav-link">
                Register
            </Link> */}
            <div className="nav-link">
                <Login />
            </div>
        </>
    )
}

export default function NavBar () {
    return (
        <nav className="flex justify-center bg-[#00ff00] border-b">
            <div className="container flex justify-between items-center py-4">
                <Link href="/" className="logo">
                    Logo
                </Link>
                <ul className="flex flex-row gap-4">
                    <Link href="/" className="nav-link">
                        Home
                    </Link>
                    <RenderUserManagement />
                </ul>
            </div>
        </nav>
    )
};