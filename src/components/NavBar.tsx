import React from "react";
import Link from "next/link";
import { auth, signIn, signOut } from "@/auth";

export async function RenderUserManagement(){
    const session = await auth();
    if(session){
        return(
            <>
                <Link href="/boards" className="nav-link">
                    My Boards
                </Link>
                <Link href="/profile" className="nav-link">
                    Profile
                </Link>
                <div className="nav-link">
                    <Logout refreshToken={session.refreshToken} idToken={session.idToken}/>
                </div>
            </>
        )
    }
    return(
        <>
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


function Login() {
    return (
        <form action={async () => {
            "use server";
            await signIn("keycloak");
        }}>
        <button>Log In</button>
    </form>
    );
}
  
function Logout({ refreshToken, idToken } : { refreshToken: string, idToken: string}) {
    return (
        <form action={async () => {
            "use server";
            try{
                await fetch('http://localhost:3000/api/auth/logout', {
                    headers: {
                        refresh_token: refreshToken,
                        id_token: idToken
                    }
                });
            }
            catch(error){
                console.error("Error during sign out: ", error);
            }
            await signOut({ redirect: true });
        }}>
            <button>Sign Out</button>
        </form>
    )
}