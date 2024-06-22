"use client"

import { Board } from "@/types";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PenLine, Trash } from "lucide-react";

import Link from "next/link";
import { useSession } from "next-auth/react";

import { deleteBoard } from "@/hooks/useBoards";

export const BoardCard = ({board} : { board: Board}) => {
    const { data: session } = useSession();

    const onDelete = async() => {
        const res = await deleteBoard(board.id,  session!.token.accessToken!);
        if(res?.result){
            location.reload();
        }
    }

    return (
        <Card>
            <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle className="text-xl">{board?.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <Link href={`/boards/${board!.id}`}>
                </Link>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button className="bg-[#4f9ae6]" asChild>
                    <Link href={`/boards/${board?.id}`} className="nav-link">
                        Open Whiteboard<PenLine className="ml-2" color="#ffffff" />
                    </Link>
                </Button>
                <Button className="bg-[#ef4444]" onClick={onDelete}>
                    Delete Whiteboard<Trash className="ml-2" color="#ffffff" />
                </Button>
            </CardFooter>
        </Card>
    )
}