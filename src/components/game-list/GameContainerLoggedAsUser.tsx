import "./GamesContainer.styles.css";
import { Game } from "../../models/game";
import { useState } from "react";
import AddGameToListModal from "../game-add/AddGameToListModal";
import * as GamesApi from "../../network/games_api";

interface GameContainerLoggedAsUserProps {
    game: Game;
}

const GameContainerLoggedAsUser = ({ game }: GameContainerLoggedAsUserProps) => {
    const [showModal, setShowModal] = useState(false);
    const releaseYear = new Date(game.releaseDate).getFullYear();

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const handleAddGame = async (status: string, review?: string, rating?: number) => {
        try {
            await GamesApi.addGameToPersonaList(game._id, { status, review, rating });
            closeModal();
        } catch (error) {
            console.error("Failed to add game to list:", error);
        }
    };

    const formatRating = (rating: number, ratingCount: number) => {
        return rating === 0 ? "N/A" : `${rating.toFixed(2)} (${ratingCount})`;
    }

    return (
        <>
            <div className="game" data-testid="game" key={game._id}>
                <img src={game.image} alt="" />
                <div className="game-details">
                    <div className="game-title">{game.title}</div>
                    <div className="game-release">{releaseYear}</div>
                    <div className="game-description">{game.description}</div>
                    <div className="game-genres">Genres: {game.genres.join(", ")}</div>
                    <div className="game-rating"><i className="fas fa-star"></i>{formatRating(Number(game.rating), Number(game.ratingCount))}</div>
                </div>
                <div className="game-buttons">
                    <button className="game-button" onClick={openModal}>
                        <i className="fas fa-plus"></i>
                    </button>
                </div>
            </div>
            {showModal && (
                <AddGameToListModal game={game} onCancel={closeModal} onAddGame={handleAddGame} />
            )}
        </>
    );
};

export default GameContainerLoggedAsUser;
