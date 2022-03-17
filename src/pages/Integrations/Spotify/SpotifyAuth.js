import useStore from '../../../utils/apiStore';
import Button from '@material-ui/core/Button';
import { Grid, Typography } from '@material-ui/core';
import { Link } from '@mui/material';
import { useEffect, useState } from 'react';
import { Route, useHistory, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
//import request from "./axiosClient";

const setIsAuthenticated = false;
const productionUrl = 'https://my.ledfx.app/callback/#/Integrations';
const localUrl = 'http://localhost:3000/callback/#/Integrations?';
const SpotifyRedirectURL = axios.create({
  baseURL: `${process.env.NODE_ENV === 'production' ? productionUrl : localUrl}`,
});
// const SpotifyRedirectURL = axios.create(
//   `${process.env.NODE_ENV === 'production' ? productionUrl : localUrl}`
// );
// const backendUrl = process.env.REACT_APP_BACKEND_URL;
//const backendUrl = "backendurl";
const apiCredentials = {
  CLIENT_ID: '7658827aea6f47f98c8de593f1491da5',
  //CLIENT_SECRET: '',
  REDIRECT_URL: `${
    process.env.NODE_ENV === 'production' ? productionUrl : localUrl
  }`,
  SCOPES: [
    //Users (Review later if needed)
    'user-top-read',
    'user-read-email',
    'user-read-private',
    //Playback
    'streaming',
    'user-read-playback-position',
    //Spotify Connect
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    //Listening History (resume playback)
    'user-read-recently-played',
    //Library
    'user-library-read',
    'user-library-modify',
  ],
};
const SpotifyURL = `https://accounts.spotify.com/authorize?client_id=${
  apiCredentials.CLIENT_ID
}&redirect_uri=${encodeURIComponent(
  apiCredentials.REDIRECT_URL
)}&scope=${encodeURIComponent(
  apiCredentials.SCOPES.join(' ')
)}&response_type=token`;
0
export function SpotifyLoginRedirect(props) {
  const [text, setText] = useState('Loading...');
  const location = useLocation();
  const params = useParams();
  const history = useHistory();
  let expDate = new Date();
  expDate.setHours(expDate.getHours() + 1);
  console.log("Spotify Token", location.hash.split('token=')[1])
  localStorage.setItem('Spotify-Token', location.hash.split('token=')[1]);
  setTimeout(() => window.location.href = 'http://localhost:3000/#/Integrations', 200); // Redirect to homepage after 3 sec
  return <p>{text}</p>;
};

export function logoutClick(props) {
  localStorage.removeItem('Spotify-Token');
  window.location.href = 'http://localhost:3000/#/Integrations';
  setIsAuthenticated = false;
  isAuthenticated = false;
};

const SpotifyView = (props) => {
  if (localStorage.getItem('Spotify-Token')) {
    const isAuthenticated = true;
  }
  return (
    <Grid
      container
      justifyContent="center"
      alignContent="center"
      style={{ height: '10%' }}
    >
      {!setIsAuthenticated ? (
        <Button
          variant="contained"
          color="primary"
          // onClick={(e) => SpotifyLoginRedirect()}
          onClick={(e) => {
            console.log("AND IT BEGINS....")            
            window.location.href = SpotifyURL            
          }}
        >
          <Typography>Connect to Spotify</Typography>
        </Button>
      ) : setIsAuthenticated ? (
        <Button
          variant="contained"
          color="primary"
          onClick={() => logoutClick()}
        >
          <Typography>Logout</Typography>
        </Button>
      ) : (
        ''
      )}
    </Grid>
  );
};

export default SpotifyView;
