import { Button } from "react-bootstrap";

interface NavBarLoggedOutViewProps {
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
}

const NavBarLoggedOutView = ({ onSignUpClicked, onLoginClicked }: NavBarLoggedOutViewProps) => {
    return (
        <>
        <div className="not-logged-in-buttons">
            <Button className='signup-button' onClick={onSignUpClicked}>Sign Up</Button>
            <Button className='login-button' onClick={onLoginClicked}>Log In</Button>
        </div>
        </>
    );
}

export default NavBarLoggedOutView;