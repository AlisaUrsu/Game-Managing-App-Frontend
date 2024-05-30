export interface GameListItem {
    _id: string,
    userId: string,
    gameId: string,
    status: string,
    rating?: string,
    review?: string,
    createdAt: string,
    updatedAt: string,
}