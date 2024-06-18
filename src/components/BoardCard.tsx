import { Board } from "@/types";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export const BoardCard = ({board} : { board: Board | undefined }) => {
    return (
        <Card>
            <Link href={`/boards/${board?.id}`}>
                <CardHeader>
                    <CardTitle>{board?.name}</CardTitle>
                </CardHeader>
            </Link>
        </Card>
    )
}