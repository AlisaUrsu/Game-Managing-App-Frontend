import "./GamesContainer.styles.css"
import {Game} from "../../models/game";
//import {IGame} from "../Games.type";
import DeleteGameModal from "../game-delete/DeleteGameModal";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import { formatDate, formatSimpleDate } from "../../utils/formatDate";
//import {sortDecreaseGamesByTitle} from "../Service";


interface GameContainerLoggedAsAdminProps {
    game: Game;
    onDeleteButton: (game: Game) => void;
};
const GameContainerLoggedAsAdmin = ({game, onDeleteButton}: GameContainerLoggedAsAdminProps) => {
    const [showModal, setShowModal] = useState(false);
    const [gameToDelete, setGameToDelete] = useState<Game |null>(null)
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

    const formatDateOfAddingOrEdit = (createdAt: string, updatedAt: string) => {
        return updatedAt > createdAt ? "Updated: " + formatDate(updatedAt) : "Added: " + formatDate(createdAt);
    }

    return (
        <>
            
                <div className="game" data-testid="game" key={game._id}>
                    <img src={game.image} alt=""/>
                                <div className="game-details">
                                    <div className="game-title">{game.title}</div>
                                    <div className="">Developer: {game.developer}, Publisher: {game.publisher}</div>
                                    <div className="game-release">{formatSimpleDate(game.releaseDate)}</div>
                                    <div className="game-description">{game.description}</div>
                                    <div className="">{game.longDescription}</div>
                                    <div className="game-genres">Platforms: {game.platform.join(", ")}</div>
                                    <div className="game-genres">Genres: {game.genres.join(", ")}</div>
                                    <div className="game-rating"><i className="fas fa-star"></i>{game.rating}</div>
                                    <div className="game-release">{formatDateOfAddingOrEdit(game.createdAt, game.updatedAt)}</div>
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

export default GameContainerLoggedAsAdmin;