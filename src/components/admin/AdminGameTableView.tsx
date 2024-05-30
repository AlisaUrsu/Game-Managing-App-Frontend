import React, { useEffect, useState } from 'react';
import {
  Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TablePagination, TableRow, IconButton, Collapse, Box, Typography,
  CircularProgress
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import * as GamesApi from "../../network/games_api";
import { Game } from '../../models/game';
import { formatDate, formatSimpleDate } from '../../utils/formatDate';
import DeleteGameModal from '../game-delete/DeleteGameModal';
import "./Admin.styles.css"

interface Column {
  id: '_id' | 'title' |'image' | 'developer' | 'publisher' | 'releaseDate' | 'platform' | 'genres' | 'rating'| 'ratingCount' | 'addedUpdated';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: any) => string;
}

const columns: readonly Column[] = [
  { id: '_id', label: 'ID', minWidth: 150},
  { id: 'title', label: 'Title', minWidth: 170 },
  { id: 'developer', label: 'Developer', minWidth: 100 },
  { id: 'publisher', label: 'Publisher', minWidth: 100 },
  {
    id: 'releaseDate',
    label: 'Release Date',
    minWidth: 120,
    align: 'right',
    format: (value: string) => formatSimpleDate(value),
  },
  {
    id: 'platform',
    label: 'Platforms',
    minWidth: 170,
    align: 'right',
    format: (value: string[]) => value.join(", "),
  },
  {
    id: 'genres',
    label: 'Genres',
    minWidth: 170,
    align: 'right',
    format: (value: string[]) => value.join(", "),
  },
  {
    id: 'rating',
    label: 'Rating',
    minWidth: 80,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
  {
    id: 'ratingCount',
    label: 'Count',
    minWidth: 80,
    align: 'right',
    format: (value: number) => value.toString(),
  },
  {
    id: 'image',
    label: 'Image',
    minWidth: 100
  },
  {
    id: 'addedUpdated',
    label: 'Added/Updated',
    minWidth: 220,
    align: 'right',
    format: (value: { createdAt: string, updatedAt: string }) => {
      return value.updatedAt > value.createdAt ? "Added: " + formatDate(value.createdAt) + "\nUpdated: " + formatDate(value.updatedAt) : "Added: " + formatDate(value.createdAt);
    },
  },
];

const AdminGameTableView: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [sortOption, setSortOption] = useState("not-sorted");
    const [recordsPerPage, setRecordsPerPage] = useState(100);
    const [totalGames, setTotalGames] = useState(0);
  const [games, setGames] = useState<Game[]>([]);
  const [gamesLoading, setGamesLoading] = useState(true);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [gameToDelete, setGameToDelete] = useState<Game | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function loadGames() {
      try {
        setGamesLoading(true);
        const { currentRecords, totalPages, totalGames } = await GamesApi.fetchPaginatedGames(currentPage + 1, recordsPerPage, sortOption);
        setGames(currentRecords);
        setTotalPages(totalPages);
        setTotalGames(totalGames);
      } catch (error) {
        console.error(error);
      } finally {
        setGamesLoading(false);
      }
    }
    loadGames();
  }, [currentPage, recordsPerPage, totalGames]);

  const handleDeleteGame = async (game: Game) => {
    try {
      await GamesApi.deleteGame(game._id);
      setGames(games.filter(g => g._id !== game._id));
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = (event: unknown, value: number) => {
    setCurrentPage(value);
  };


  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRecordsPerPage(+event.target.value);
    setCurrentPage(0);
  };



  return (
    <div className="container-table">
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
      <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          component="div"
          style={{marginTop: 10, marginLeft: 10}}
        >
          Games
        </Typography>
        <Table size="small"  aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell />
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth}}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gamesLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length + 2}>
                <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
                    <CircularProgress color='secondary' /> {/* Show loading spinner */}
                </Box>
                </TableCell>
              </TableRow>
            ) : (
              games
                
                .map((game) => {
               
                  return (
                    <React.Fragment key={game._id}>
                      <TableRow hover role="checkbox" tabIndex={-1} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell
                        style={{fontSize: '0.7rem' }}>
                          <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                          >
                            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                          </IconButton>
                        </TableCell>
                        {columns.map((column) => {
                          const value = column.id === 'addedUpdated' ? { createdAt: game.createdAt, updatedAt: game.updatedAt } : (game as any)[column.id];
                          return (
                            <TableCell key={column.id} align={column.align} style={{ fontSize: '0.8rem' }}>
                              {column.id === 'image' ? (
                                <img src={value} alt="Game" style={{ width: 50, height: 'auto' }} />
                                    ) : (
                                    column.format && value !== undefined ? column.format(value) : value
                                    )}
                            </TableCell>
                          );
                        })}
                        <TableCell>
                          <IconButton onClick={() => navigate(`/update/${game._id}`)}>
                            <i className="far fa-edit"></i>
                          </IconButton>
                          <IconButton onClick={() => { setGameToDelete(game); setShowModal(true); }}>
                            <i className="far fa-trash-alt"></i>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={columns.length + 2}>
                          <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box margin={1}>
                              
                              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell>Long Description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{game.description}</TableCell>
                    <TableCell>{game.longDescription}</TableCell>
                  </TableRow>
                </TableHead>
                </Table>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  );
                })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[25, 50, 100, 200]}
        component="div"
        count={totalGames}
        rowsPerPage={recordsPerPage}
        page={currentPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
       
      />
      {showModal && gameToDelete && (
        <DeleteGameModal
          onCancelButton={() => setShowModal(false)}
          onDeleteButton={() => handleDeleteGame(gameToDelete)}
        />
      )}
    </Paper>
    </div>
  );
}

export default AdminGameTableView;
