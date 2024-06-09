export type Board = {
    boardId: number,
    ownerId: number,
    name: String,
    members: number[]
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