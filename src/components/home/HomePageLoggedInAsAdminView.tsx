import React, { useState } from 'react';
import { Tab, Tabs, createTheme, ThemeProvider } from '@mui/material';
import AdminGameTableView from '../admin/AdminGameTableView';
import AdminUserTableView from '../admin/AdminUserTableView';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          color: 'white', // Set default text color
          '&.Mui-selected': {
            color: '#6f36df', // Set selected text color
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: '#6f36df', // Set indicator color
        },
      },
    },
  },
});

const AdminDashboard: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const navigate = useNavigate();

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          indicatorColor="primary"
          variant="fullWidth"
        >
          <Tab label="Games" />
          <Tab label="Users" />
        </Tabs>
        <div className="search-add-space">
            

            <div className="barchart-container">
                <h3>Most popular genres: </h3>
                <button className="add-button" onClick={() => {navigate("/chart")}}>See Barchart</button>
            </div>
            <button className="add-button" onClick={() => {navigate("/add")}}>Add Game</button>
        </div>
        {tabIndex === 0 && <AdminGameTableView />}
        {tabIndex === 1 && <AdminUserTableView />}
      </div>
    </ThemeProvider>
  );
}

export default AdminDashboard;
