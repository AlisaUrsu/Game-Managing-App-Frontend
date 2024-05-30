import "./GamesContainer.styles.css"
import {Game} from "../../models/game";
//import {IGame} from "../Games.type";
import DeleteGameModal from "../game-delete/DeleteGameModal";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
//import {sortDecreaseGamesByTitle} from "../Service";


interface GameContainerLoggedOutProps {
    game: Game;
};
const GameContainerLoggedOut = ({game}: GameContainerLoggedOutProps) => {
    const releaseYear = new Date(game.releaseDate).getFullYear();
    const navigate = useNavigate();

    const formatRating = (rating: number, ratingCount: number) => {
        return rating === 0 ? "N/A" : `${rating.toFixed(2)} (${ratingCount})`;
    }

    return (
        <>
             
                <div className="game" data-testid="game" key={game._id}>
                    <img src={game.image} alt=""/>
                                <div className="game-details">
                                    <div className="game-title">{game.title}</div>
                                    <div className="game-release">{releaseYear}</div>
                                    <div className="game-description">{game.description}</div>
                                    <div className="game-genres">Genres: {game.genres.join(", ")}</div>
                                    <div className="game-rating"><i className="fas fa-star"></i>{formatRating(Number(game.rating), Number(game.ratingCount))}</div>
                                </div>
                               
                </div>
                                
        </>
    )
}

export default GameContainerLoggedOut;