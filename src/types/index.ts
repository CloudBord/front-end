import { UUID } from "crypto"

export type Board = {
    boardId: UUID,
    ownerId: UUID,
    name: String,
    members: String[]
}