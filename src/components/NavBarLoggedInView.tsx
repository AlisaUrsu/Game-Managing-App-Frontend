import { Button, Nav, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import * as GamesApi from "../network/games_api";
import { Link } from "react-router-dom";

interface NavBarLoggedInViewProps {
    user: User,
    onLogoutSuccessful: () => void,
}

const NavBarLoggedInView = ({ user, onLogoutSuccessful }: NavBarLoggedInViewProps) => {

    async function logout() {
        try {
            await GamesApi.logout();
            onLogoutSuccessful();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return (
        <>
            <Nav.Link as={Link} to="/your-list">Your List</Nav.Link>
            <Navbar.Text className="me-2">
                <div className="signed-in-text">Signed in as: {user.username}</div>
            </Navbar.Text>
            <Button className="signup-button" onClick={logout}>Log out</Button>
        </>
    );
}

export default NavBarLoggedInView;