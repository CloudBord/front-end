export type Board = {
    id: number,
    ownerId: number,
    name: String,
    memberIds: number[]
}

export type ConnectionInfo = {
    Url: string,
    AccessToken: string
}

export type Message = {
    sender: string;
    content: string;
    sentTime: Date;
}

export type Result = {
    result: boolean;
    boardId: number
}