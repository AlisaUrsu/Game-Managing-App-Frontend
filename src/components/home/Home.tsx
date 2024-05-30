import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './Home.styles.css';
import * as GamesApi from "../../network/games_api";
import { Game } from '../../models/game';
import GamesContainer from '../game-list/GameContainerLoggedAsManager';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Pagination } from '@mui/material';
import { User } from '../../models/user';
import HomePageLoggedInAsManagerView from './HomePageLoggedInAsManagerView';
import HomePageLoggedInAsUseriew from './HomePageLoggedInAsUserView';
import HomePageLoggedOutView from './HomePageLoggedOutView';
import AdminGameTableView from '../admin/AdminGameTableView';
import AdminUserTableView from '../admin/AdminUserTableView';
import HomePageLoggedInAsAdminView from './HomePageLoggedInAsAdminView';
import AdminGameListsTableView from '../admin/AdminGameListsTableView';

interface HomeProps {
  loggedInUser: User | null;
}

const Home = ({loggedInUser}: HomeProps) =>{
  return (
    <>
      {loggedInUser && loggedInUser.role === "manager"
        ? <HomePageLoggedInAsManagerView/>
        : loggedInUser && loggedInUser.role === "basic"
        ? <HomePageLoggedInAsUseriew/>
        : loggedInUser && loggedInUser.role === "admin"
        ? <HomePageLoggedInAsAdminView />
        : <HomePageLoggedOutView/>
      }
    </>
  );
}

export default Home;
