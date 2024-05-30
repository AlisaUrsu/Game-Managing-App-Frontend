import "./GamesContainer.styles.css"
import {Game} from "../../models/game";
//import {IGame} from "../Games.type";
import DeleteGameModal from "../game-delete/DeleteGameModal";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
//import {sortDecreaseGamesByTitle} from "../Service";


interface GameContainerLoggedAsManagerProps {
    game: Game;
    onDeleteButton: (game: Game) => void;
};
const GameContainerLoggedAsManager = ({game, onDeleteButton}: GameContainerLoggedAsManagerProps) => {
    const [showModal, setShowModal] = useState(false);
    const [gameToDelete, setGameToDelete] = useState<Game |null>(null)
    const releaseYear = new Date(game.releaseDate).getFullYear();
    const navigate = useNavigate();

    const openModal = (game: Game) => {
        setGameToDelete(game);
        setShowModal(true);

    }

    const closeModal = () => {
        setShowModal(false);
        setGameToDelete(null);
    }

    const handleDelete = () => {
        if (gameToDelete) {
            onDeleteButton(gameToDelete);
            closeModal();
        }
    }

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
                                <div className="game-buttons">
                                    <button className="game-button" data-testid="edit-button" value="edit" onClick={() => {navigate(`/update/${game._id}`)}}><i className="far fa-edit"></i></button>
                                    <button className="game-button" data-testid="delete-button" value="delete" onClick={() => openModal(game)}><i className="far fa-trash-alt"></i></button>
                                </div>
                </div>
                        
            
            {showModal && (<DeleteGameModal onCancelButton={closeModal} onDeleteButton={handleDelete}/>)}

        </>
    )
}

export default GameContainerLoggedAsManager;