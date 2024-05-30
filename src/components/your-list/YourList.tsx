import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import * as GamesApi from "../../network/games_api";
import { Game } from '../../models/game';
import GameContainerLoggedAsUser from '../game-list/GameContainerLoggedAsUser';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, CircularProgress, Pagination } from '@mui/material';
import GameContainerPersonalList from '../game-list/GameContainerPersonalList';
import { GameListItem } from '../../models/gameList';

const YourList: React.FC = () => {
  const [games, setGames] = useState<GameListItem[]>([]);
  const [serverDown, setServerDown] = useState(false);
  const [gamesLoading, setGamesLoading] = useState(true);
  //const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get("page") || "1", 10);
    const recordsPerPage = parseInt(searchParams.get("records") || "100", 10);

  useEffect(() => {
      async function loadGames() {
          try {
              setGamesLoading(true);
              setServerDown(false);
              const { currentRecords, totalPages } = await GamesApi.fetchPaginatedGameItems(currentPage, recordsPerPage); 
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
  }, 5000);

  return () => clearInterval(intervalId); 
}, []);

useEffect(() => {
  if (serverDown) {
    window.location.reload();
  }
}, [serverDown]);



const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
  setSearchParams({ page: value.toString(), records: recordsPerPage.toString() });
};

return (
  <>
      <div className="container-game-your-list">
      {gamesLoading ? ( // Check if games are loading
        <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
          <CircularProgress color='secondary'/> {/* Show loading spinner */}
        </Box>
      ) : serverDown ? (
              <div>Server is down. Please try again later.</div>
          ) : (
            <>
              {games.map((game, index) => (
                  <GameContainerPersonalList
                      key={game._id}
                      listItem={game}
                      index={(currentPage - 1) * recordsPerPage + index + 1}
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
          )}
      </div>
  </>
);
}

export default YourList;
