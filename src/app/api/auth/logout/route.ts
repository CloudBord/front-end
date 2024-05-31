import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse){
    try{
        const refreshToken = req.headers.get("refresh_token");
        const idToken = req.headers.get("id_token");

        if(!refreshToken || !idToken) throw new Error("Session information missing!");
        
        const body = `client_id=${process.env.KEYCLOAK_CLIENT_ID}&client_secret=${process.env.KEYCLOAK_CLIENT_SECRET}&refresh_token=${refreshToken}`;

        const request = await fetch(
            `${process.env.KEYCLOAK_END_SESSION_ENDPOINT}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body
            }
        );

        if(request && request.status && request.status >= 300){
            console.warn("END_SESSION ERROR", request.status);
            throw new Error("Unable to log out from the session!");
        }

        return NextResponse.json({
            success: true
        })
    }
    catch(error){
        let message;
        if(error instanceof Error) message = error.message;
        else message = String(error);
        return NextResponse.json({
            message: message,
            status: 500,
            success: false
        });
    }
}