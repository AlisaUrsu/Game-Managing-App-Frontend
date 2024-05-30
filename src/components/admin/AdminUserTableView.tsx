// AdminUserTableView.tsx (Adjust your file name accordingly)
import React, { useEffect, useState } from 'react';
import {
  Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TablePagination, TableRow, IconButton, Collapse, Box, Typography,
  CircularProgress
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import * as GamesApi from "../../network/games_api";
import { User } from '../../models/user';
import { formatDate } from '../../utils/formatDate';
import AdminGameListsTableView from './AdminGameListsTableView'; // Import the inner table component

interface Column {
  id: '_id' | 'username' | 'email' | 'password' | 'role' | 'lastLogin' | 'addedUpdated';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: any) => string;
}

const columns: readonly Column[] = [
  { id: '_id', label: 'ID' },
  { id: 'username', label: 'Username' },
  { id: 'email', label: 'Email' },
  { id: 'password', label: 'Password', minWidth: 220 },
  { id: 'role', label: 'Role', minWidth: 100 },
  {
    id: 'lastLogin',
    label: 'Last Login',
    minWidth: 220,
    align: 'right',
    format: (value: string) => formatDate(value),
  },
  {
    id: 'addedUpdated',
    label: 'Added/Updated',
    minWidth: 240,
    align: 'right',
    format: (value: { createdAt: string, updatedAt: string }) => {
      return value.updatedAt > value.createdAt ? "Created: " + formatDate(value.createdAt) + "\nUpdated: " + formatDate(value.updatedAt) : "Created: " + formatDate(value.createdAt);
    },
  },
];

const AdminUserTableView: React.FC = () => {
  const [currentPageUser, setCurrentPageUser] = useState(0);
  const [totalPagesUser, setTotalPagesUser] = useState(1);
  const [recordsPerPageUser, setRecordsPerPageUser] = useState(5);
  const [users, setUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [openRow, setOpenRow] = useState<string | null>(null); // Track which row is open
  const [userToDelete, setUserToDelete] = useState<User | null>(null)
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadUsers() {
      try {
        setUsersLoading(true);
        const { currentRecords, totalPages } = await GamesApi.fetchPaginatedUsers(currentPageUser + 1, recordsPerPageUser);
        setUsers(currentRecords);
        setTotalPagesUser(totalPages);
      } catch (error) {
        console.error(error);
      } finally {
        setUsersLoading(false);
      }
    }
    loadUsers();
  }, [currentPageUser, recordsPerPageUser]);

  const handlePageChange = (event: unknown, value: number) => {
    setCurrentPageUser(value);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRecordsPerPageUser(+event.target.value);
    setCurrentPageUser(0);
  };

  const handleRowClick = (userId: string) => {
    setOpenRow(openRow === userId ? null : userId);
  };

  const handleDelete = async (id: string) => {
    try {
       
        await GamesApi.deleteAccount(id);
        setUsers(users.filter(user => user._id !== id));
        
    } catch (error) {
        alert(error);
        console.error("Failed to delete from list:", error);
    }
};

  return (
    <div className="container-table">
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            component="div"
            style={{ marginTop: 10, marginLeft: 10 }}
          >
            Users
          </Typography>
          <Table size="small" aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell />
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersLoading ? (
                <TableRow>
                  <TableCell colSpan={columns.length + 2}>
                    <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
                      <CircularProgress color='secondary' />
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <React.Fragment key={user._id}>
                    <TableRow hover role="checkbox" tabIndex={0}>
                      <TableCell>
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          onClick={() => handleRowClick(user._id)}
                        >
                          {openRow === user._id ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        </IconButton>
                      </TableCell>
                      {columns.map((column) => {
                        const value = column.id === 'addedUpdated' ? { createdAt: user.createdAt, updatedAt: user.updatedAt } : (user as any)[column.id];
                        return (
                          <TableCell key={column.id} align={column.align} style={{ fontSize: '0.8rem' }}>
                            {column.format && value !== undefined ? column.format(value) : value}
                          </TableCell>
                        );
                      })}
                      <TableCell>
                      <TableCell>
                          
                          <IconButton onClick={() => handleDelete(user._id)}>
                            <i className="far fa-trash-alt"></i>
                          </IconButton>
                        </TableCell>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={columns.length + 2} style={{ paddingBottom: 0, paddingTop: 0 }}>
                        <Collapse in={openRow === user._id} timeout="auto" unmountOnExit>
                          <Box margin={1}>
                            <AdminGameListsTableView userId={user._id} />
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalPagesUser * recordsPerPageUser}
          rowsPerPage={recordsPerPageUser}
          page={currentPageUser}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default AdminUserTableView;
