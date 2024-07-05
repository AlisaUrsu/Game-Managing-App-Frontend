import { Game } from "../models/game";
import {User} from "../models/user";
import { GameListItem } from "../models/gameList";
import { ConflictError, UnauthorizedError } from "../errors/http_errors";

const requestQueue: (() => Promise<any>)[] = [];


function addToRequestQueue(request: () => Promise<any>) {
    requestQueue.push(request);
}


async function processRequestQueue() {
    while (requestQueue.length > 0) {
        const request = requestQueue.shift();
        if (request) {
            await request();
        }
    }
}

export async function checkServerStatusAndProcessQueue(callback?: () => void) {
    
        try {
            await fetch('/api/ping'); 
            await processRequestQueue(); 
            if (callback) callback();
        } catch (error) {
            console.error('Server is still down:', error);

        }
    
}


async function fetchData(input: RequestInfo, init?: RequestInit) {

    try {
        const response = await fetch(input, init);
        if (response.ok) {
            return response;
        } else {
            const errorBody = await response.json();
            const errorMessage = errorBody.error;
            if (response.status === 401) {
                throw new UnauthorizedError(errorMessage);
            } else if (response.status === 409) {
                throw new ConflictError(errorMessage);
            } else {
                throw new Error("Request failed with status: " + response.status + " message: " + errorMessage);
            }
        }
    } catch (error) {
        addToRequestQueue(() => fetchData(input, init));
        throw new Error('Failed to fetch data from the server. Request added to queue.');
    }
}


export async function fetchGames(): Promise<Game[]> {
    const response = await fetchData("/api/games", {method: "GET"});
    return response.json();
}

export async function fetchPaginatedGames(page: number, records: number, sortOption: string, genres?: string[], ratingRange?: string): Promise<any> {
    let url = `/api/games/${page}/${records}/${sortOption}`;

    // Construct query string for genres and ratingRange
    const queryParams = [];
    if (genres && genres.length > 0) {
        queryParams.push(`genres=${genres.join(',')}`);
    }
    if (ratingRange) {
        queryParams.push(`rating=${ratingRange}`);
    }
    if (queryParams.length > 0) {
        url += `?${queryParams.join('&')}`;
    }

    try {
        const response = await fetchData(url);
        return await response.json();
    } catch (error) {
        console.error('Error fetching games:', error);
        throw error;
    }
}

export async function fetchPaginatedGameItems(page: number, records: number): Promise<any> {
    let url = `/api/your-list/${page}/${records}`;

    try {
        const response = await fetchData(url);
        return await response.json();
    } catch (error) {
        console.error('Error fetching games:', error);
        throw error;
    }
}

export async function fetchGameLists(userId: string, page: number, records: number): Promise<any> {
    let url = `/api/your-list/${userId}/${page}/${records}`;

    try {
        const response = await fetchData(url);
        return await response.json();
    } catch (error) {
        console.error('Error fetching games:', error);
        throw error;
    }
}

export async function fetchPaginatedUsers(page: number, records: number): Promise<any> {
    let url = `/api/users/${page}/${records}`;

    try {
        const response = await fetchData(url);
        return await response.json();
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

export interface GameInput {
    title: string,
    developer: string,
    publisher: string,
    releaseDate: string,
    platform: string[]
    description: string,
    longDescription: string,
    genres: string[],
    rating: number | string,
    image: string
}

export async function fetchGameById(id: string | undefined): Promise<Game> {
    const response = await fetchData("/api/games/" + id, {method: "GET"});
    return response.json();
}

export async function addGame(game: GameInput): Promise<Game> {
    const response = await fetchData("/api/games/add",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(game),
    });
    return response.json();
}

export interface GameListInput {
    status: string;
    review?: string;
    rating?: number;
}


export async function addGameToPersonaList(id: string, game: GameListInput): Promise<GameListItem> {
    const response = await fetchData("/api/your-list/add-game/" + id, 
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(game),
    });
    console.log(game);
    return response.json();
}

export async function updateGameFromPersonalList(id: string, game: GameListInput): Promise<GameListItem> {
    const response = await fetchData("/api/your-list/update-game/" + id, 
    {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(game),
    });
    console.log(game);
    return response.json();
}

export async function deleteGameFromPersonalList(id: string): Promise<void> {
    await fetchData("/api/your-list/delete-game/" + id, { method: "DELETE" })
}

export async function deleteGameFromAnUsersList(userId: string, gameId: string): Promise<void> {
    await fetchData("/api/your-list/" + userId + "/delete-game/" + gameId, { method: "DELETE" })
}

export async function deleteGame(id: string): Promise<void> {
    await fetchData("/api/games/delete/" + id, { method: "DELETE" });
}

export async function deleteAccount(id: string): Promise<void> {
    await fetchData("/api/users/delete-account/" + id, {method: "DELETE"});
}

export async function updateGame(id: string, game: GameInput): Promise<Game> {
    const response = await fetchData("/api/games/update/" + id,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(game),
        });
    return response.json();
}

export async function getLoggedInUser(): Promise<User> {
    const response = await fetchData("/api/users", { method: "GET" });
    return response.json();
}

export interface SignUpCredentials {
    username: string,
    email: string,
    password: string,
    role: "basic" | "manager"
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
    const response = await fetchData("/api/users/signup",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
    return response.json();
}

export interface LoginCredentials {
    email: string,
    password: string,
}

export async function login(credentials: LoginCredentials): Promise<User> {
    const response = await fetchData("/api/users/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
    return response.json();
}

export async function logout() {
    await fetchData("/api/users/logout", { method: "POST" });
}

export async function getGenres(): Promise<string[]> {
    const response = await fetchData("/api/games/genres", {method: "GET"});
    return response.json();
}

export async function getPlatforms(): Promise<string[]> {
    const response = await fetchData("/api/games/platforms", {method: "GET"});
    return response.json();
}

export async function getChartData(): Promise<{ [genre: string]: number }> {
    const response = await fetchData("/api/games/chart-data", {method: "GET"});
    console.log("a");
    return response.json();
}



export async function getGamesFromAPersonalList(): Promise<GameListItem[]> {
    const response = await fetchData("/api/your-list", {method: "GET"});
    return response.json();
}