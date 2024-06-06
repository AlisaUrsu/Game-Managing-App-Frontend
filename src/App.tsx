import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import * as GamesApi from "./network/games_api";
import { Game } from './models/game';
import GamesContainer from './components/game-list/GameContainerLoggedAsManager';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './components/home/Home';
import AddGame from './components/game-add/AddGame';
import UpdateGame from './components/game-update/UpdateGame';
import HomePageLoggedOutView from './components/home/HomePageLoggedOutView';
import HomePageLoggedInAsManagerView from './components/home/HomePageLoggedInAsManagerView';
import HomePageLoggedInAsUseriew from './components/home/HomePageLoggedInAsUserView';
import { User } from './models/user';
import NavBar from './components/NavBar';
import SignUpModal from './components/SignUpModal';
import LoginModal from './components/LoginModal';
import ProtectedRoute from './ProtectedRoutes';
import GenreBarChart from './components/barchart/GenreBarChart';
import GenresChart from './components/barchart/GenresChart';
import YourList from './components/your-list/YourList';

function App() {
   const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        setLoadingError(false);
        const user = await GamesApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
        setLoadingError(true); // Set loading error to true if fetching user fails
      }
    };
    fetchLoggedInUser();
  }, []);
  return (
   <>
      <NavBar 
         loggedInUser={loggedInUser} 
         onLoginClicked={() => setShowLoginModal(true)} 
         onSignUpClicked={() => setShowSignUpModal(true)}
         onLogoutSuccessful={() => setLoggedInUser(null)} 
      />
      <Routes>
         <Route path="/home" element={<Home loggedInUser={loggedInUser} />} />
         <Route index element={<Home loggedInUser={loggedInUser} />} />
         
         <Route 
          path="/add" 
          element={
            <ProtectedRoute loggedInUser={loggedInUser} requiredRoles={["manager", "admin"]}>
              <AddGame onSubmitButton={() => {}} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/update/:id" 
          element={
            <ProtectedRoute loggedInUser={loggedInUser} requiredRoles={["manager", "admin"]}>
              <UpdateGame onUpdateButton={() => {}} />
            </ProtectedRoute>
          } 
        />
        <Route path="/chart" 
        element={
          <ProtectedRoute loggedInUser={loggedInUser}>
            <GenresChart />
            </ProtectedRoute>
        }
        />
        <Route path="/your-list"
        element={
          <ProtectedRoute loggedInUser={loggedInUser}>
            <YourList />
            </ProtectedRoute>
        } />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>

      {showSignUpModal && <SignUpModal 
          onDismiss={() => setShowSignUpModal(false)} 
          onSignUpSuccessful={(user) => {
            setLoggedInUser(user);
            setShowSignUpModal(false);
            navigate("/home?page=1&records=100");
          }}
        />
      }
      {showLoginModal && <LoginModal 
          onDismiss={() => {setShowLoginModal(false)}} 
          onLoginSuccessful={(user) => {
            setLoggedInUser(user);
            setShowLoginModal(false);
            navigate("/home?page=1&records=100");
          }}
        />
      }
      
   </>
 );

}

export default App;
