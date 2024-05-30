import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './Home.styles.css';
import * as GamesApi from "../../network/games_api";
import { Game } from '../../models/game';

import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, CircularProgress, Pagination } from '@mui/material';
import GameContainerLoggedAsManager from '../game-list/GameContainerLoggedAsManager';

const HomePageLoggedInAsManagerView: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [serverDown, setServerDown] = useState(false);
  const [gamesLoading, setGamesLoading] = useState(true);
  //const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOption, setSortOption] = useState("not-sorted");
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const recordsPerPage = parseInt(searchParams.get("records") || "100", 10);

  useEffect(() => {
      async function loadGames() {
          try {
              setGamesLoading(true);
              setServerDown(false);
              const { currentRecords, totalPages } = await GamesApi.fetchPaginatedGames(currentPage, recordsPerPage, sortOption); // Assuming 10 records per page
              setGames(currentRecords);
              setTotalPages(totalPages);
          } catch(error) {
              alert(error);
              console.log(error);
              setServerDown(true);
          } finally {
              setGamesLoading(false);
          }
      }
      loadGames();
  }, [currentPage, recordsPerPage]); 


useEffect(() => {
  const intervalId = setInterval(async () => {
    try {
      await GamesApi.checkServerStatusAndProcessQueue();
      setServerDown(false);
    } catch (error) {
      alert(error);
      setServerDown(true);
      setGamesLoading(false); 
    }
  }, 50000);

  return () => clearInterval(intervalId); 
}, []);

useEffect(() => {
  if (serverDown) {
    window.location.reload(); 
  }
}, [serverDown]);

async function deleteGame(game: Game) {
  try {
      await GamesApi.deleteGame(game._id);
      setGames(games.filter(existingGame => existingGame._id !== game._id));
  } catch (error) {
      console.error(error);
      alert(error);
  }
}

const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
  setSearchParams({ page: value.toString(), records: recordsPerPage.toString() });
};

  return (
    <>
        <div className="search-add-space">
            

            <div className="barchart-container">
                <h3>Most popular genres: </h3>
                <button className="add-button" onClick={() => {navigate("/chart")}}>See Barchart</button>
            </div>
            <button className="add-button" onClick={() => {navigate("/add")}}>Add Game</button>
        </div>
        <div className="containerGame">
        
        {gamesLoading ? ( // Check if games are loading
        <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
          <CircularProgress color='secondary'/> {/* Show loading spinner */}
        </Box>
      ) : serverDown ? (
            <div>Server is down. Please try again later.</div>
        ) : (
          <>
            {games.map(game => (
            <GameContainerLoggedAsManager
                key={game._id}
                game={game}
                onDeleteButton={deleteGame}
            />
            
            ))}
            <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            siblingCount={2}
                            boundaryCount={1}
                            variant="outlined"
                            shape="rounded"
                        />
                        </>
            
        ) }
    
        </div>
        
    </>
  );
}

export default HomePageLoggedInAsManagerView;
