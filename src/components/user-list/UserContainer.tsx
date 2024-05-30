import "./GamesContainer.styles.css"
import { User } from "../../models/user";
//import {IGame} from "../Games.type";
//import DeleteGameModal from "../game-delete/DeleteGameModal";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
//import {sortDecreaseGamesByTitle} from "../Service";


interface UserContainerProps {
    user: User;
   // onDeleteButton: (game: Game) => void;
};
const UserContainer = ({user}: UserContainerProps) => {
    const [showModal, setShowModal] = useState(false);
    //const [gameToDelete, setGameToDelete] = useState<Game |null>(null)
    const navigate = useNavigate();

    /*const openModal = (game: Game) => {
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
    }*/

    const formatDateOfAddingOrEdit = (createdAt: string, updatedAt: string) => {
        return updatedAt > createdAt ? "Updated: " + formatDate(updatedAt) : "Added: " + formatDate(createdAt);
    }

    return (
        <>
          
              

        </>
    )
}

export default UserContainer;