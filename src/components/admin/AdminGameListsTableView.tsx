// InnerTableWithPagination.tsx
import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TablePagination, TableRow, CircularProgress,
  Typography,
  IconButton
} from '@mui/material';
import * as GamesApi from "../../network/games_api";  // Adjust the import according to your project structure

interface GameListEntry {
  gameId: string;
  status: string;
  review: string;
  rating: number;
}

interface InnerTableProps {
  userId: string;
}

const AdminGameListsTableView: React.FC<InnerTableProps> = ({ userId }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [recordsPerPage, setRecordsPerPage] = useState(25);
  const [totalGames, setTotalGames] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [gameList, setGameList] = useState<GameListEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const { currentRecords, totalPages, totalGames } = await GamesApi.fetchGameLists(userId, currentPage + 1, recordsPerPage);  // Adjust this according to your API
        setGameList(currentRecords);
        setTotalPages(totalPages);
        setTotalGames(totalGames);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [currentPage, recordsPerPage, userId, totalGames]);

  const handlePageChange = (event: unknown, value: number) => {
    setCurrentPage(value);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRecordsPerPage(+event.target.value);
    setCurrentPage(0);
  };

  const handleDelete = async (gameId: string) => {
    try {
       
        await GamesApi.deleteGameFromAnUsersList(userId, gameId);
        setGameList(gameList.filter(game => game.gameId !== gameId));
        
    } catch (error) {
        alert(error);
        console.error("Failed to delete from list:", error);
    }
};

  return (
    <>
    
    <TableContainer>
      <Typography
          sx={{ flex: '1 1 100%' }}
          
          component="div"
          style={{marginTop: 0, marginLeft: 0, fontSize: '1.25rem'}}
        >
          Games
        </Typography>
        <Table size="small">
        
          <TableHead>
            <TableRow>
              <TableCell>Game ID</TableCell>
              <TableCell>Playing Status</TableCell>
              <TableCell>User Review</TableCell>
              <TableCell>User Rating</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5}>
                    <CircularProgress color='secondary' />
                </TableCell>
              </TableRow>
            ) : (
              gameList.map((game) => (
                <TableRow key={game.gameId} style={{ fontSize: '0.8rem' }}>
                  <TableCell style={{ fontSize: '0.8rem' }}>{game.gameId}</TableCell>
                  <TableCell style={{ fontSize: '0.8rem' }}>{game.status}</TableCell>
                  <TableCell style={{ fontSize: '0.8rem' }}>{game.review}</TableCell>
                  <TableCell style={{ fontSize: '0.8rem' }}>{game.rating}</TableCell>
                  <TableCell style={{ fontSize: '0.8rem' }}>
                  <IconButton onClick={() => handleDelete(game.gameId)}>
                            <i className="far fa-trash-alt"></i>
                          </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[25, 50, 100]}
        component="div"
        count={totalGames}
        rowsPerPage={recordsPerPage}
        page={currentPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
 
}

export default AdminGameListsTableView;
