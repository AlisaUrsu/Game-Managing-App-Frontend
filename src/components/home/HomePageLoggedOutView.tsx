import './Home.styles.css';
import * as GamesApi from "../../network/games_api";
import { Game } from '../../models/game';
import GameContainerLoggedOut from '../game-list/GameContainerLoggedOut';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, CircularProgress, Pagination } from '@mui/material';

const HomePageLoggedOutView = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [serverDown, setServerDown] = useState(false);
    const [gamesLoading, setGamesLoading] = useState(true);
   // const [currentPage, setCurrentPage] = useState(1);
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
            }
        }, 50000);

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
            <div className="message-container">
            <h1>Welcome to the Game Explorer</h1>
            <p>Explore our extensive library of games! To access additional features such as personalized lists, ratings, and recommendations, please log in or sign up.</p>
            </div>
            <div className="containerGame">
            {gamesLoading ? ( // Check if games are loading
        <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
          <CircularProgress color='secondary' /> {/* Show loading spinner */}
        </Box>
      ) : serverDown ? (
        <div>Server is down. Please try again later.</div>
      ) : (
        <>
          {games.map(game => (
            <GameContainerLoggedOut
              key={game._id}
              game={game} />
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

export default HomePageLoggedOutView;
