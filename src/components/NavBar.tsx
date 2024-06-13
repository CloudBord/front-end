"use client"
import React from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { logOut } from "@/lib/login";

export default function NavBar () {
    const { data: session } = useSession();

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
                    { session ? 
                        <Button onClick={() => logOut()}>
                            Logout
                        </Button>
                    : 
                        <Button onClick={async() => await signIn("keycloak")}>
                            Login
                        </Button>
                    }
                </ul>
            </div>
        </nav>
    )
};