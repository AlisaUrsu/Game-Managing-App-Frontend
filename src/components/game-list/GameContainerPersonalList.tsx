import "./GamesContainer.styles.css"
import {Game} from "../../models/game";
//import {IGame} from "../Games.type";
import DeleteGameModal from "../game-delete/DeleteGameModal";
import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { GameListItem } from "../../models/gameList";
import * as GamesApi from "../../network/games_api";
import UpdateGameFromListModal from "../game-update/UpdateGameFromListModal";
import { formatDate } from "../../utils/formatDate";
//import {sortDecreaseGamesByTitle} from "../Service";


interface GameContainerPersonalListProps {
    listItem: GameListItem;
    index: number;
}
const GameContainerPersonalList = ({listItem, index}: GameContainerPersonalListProps) => {
    const navigate = useNavigate();
    const [game, setGame] = useState<Game | null>(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const openUpdateModal = () => setShowUpdateModal(true);
    const closeUpdateModal = () => setShowUpdateModal(false);

    const openDeleteModal = () => setShowDeleteModal(true);
    const closeDeleteModal = () => setShowDeleteModal(false);


    useEffect(() => {
        async function fetchGame() {
            try {
                const response = await GamesApi.fetchGameById(listItem.gameId);
                setGame(response);
            } catch (error) {
                console.error(error);
                alert(error);
            }
        }

        fetchGame();
    }, []);

    const handleUpdateGame = async (status: string, review?: string, rating?: number) => {
        try {
            if (game){
            await GamesApi.updateGameFromPersonalList(game._id, { status, review, rating });
            closeUpdateModal();
            window.location.reload();
            }
        } catch (error) {
            alert(error);
            console.error("Failed to update game from list:", error);
        }
    };

    const handleDeleteGame = async () => {
        try {
            if (game){
            await GamesApi.deleteGameFromPersonalList(game._id);
            closeUpdateModal();
            window.location.reload();
            }
        } catch (error) {
            alert(error);
            console.error("Failed to delete from list:", error);
        }
    };

    const formatDateOfAddingOrEdit = (createdAt: string, updatedAt: string) => {
        return updatedAt > createdAt ? "Updated: " + formatDate(updatedAt) : "Added: " + formatDate(createdAt);
    }

    return (
        <>
             {game && showUpdateModal && (
                <UpdateGameFromListModal game={game} onCancel={closeUpdateModal} onUpdateGame={handleUpdateGame} />
                
            )}
            {game && showDeleteModal && (
                <DeleteGameModal  onCancelButton={closeDeleteModal} onDeleteButton={handleDeleteGame} />
                
            )}
            {game?
                <div className="game-your-list" data-testid="game" key={game._id}>
                    <div className="game-index">{index}</div>
                    <img src={game.image} alt=""/>
                                <div className="game-details">
                                    <div className="game-title">{game.title}</div>
                                    <div className="game-description">{listItem.review}</div>
                                    <div className="game-rating"><i className="fas fa-star"></i>{listItem.rating}</div>
                                    <div className="game-release">{formatDateOfAddingOrEdit(game.createdAt, game.updatedAt)}</div>
                                </div>
                                <div className="game-status">{listItem.status}</div>
                                <div className="game-buttons-your-list">
                                    
                                    <button className="game-button-your-list" data-testid="edit-button" value="edit" onClick={openUpdateModal}>Edit</button>
                                    <button className="game-button-your-list" data-testid="delete-button" value="delete" onClick={openDeleteModal}>Delete</button>
                                </div>
                               
                </div>
                
:<p></p>}    
    
        </>
    )
}

export default GameContainerPersonalList;