"use server"
import { auth, signOut } from "@/auth"

export const logOut = async() => {
    const session = await auth();
    if(!session) throw new Error('Not logged in!');
    try{
        await fetch(`${process.env.AUTH_SIGNOUT_URL}`, {
            headers: {
                refresh_token: session.token.refreshToken!,
                id_token: session.token.idToken!
            },
        });
    }
    catch(error){
        console.error("Error during sign out: ", error);
    }
    await signOut({ redirect: true });
}