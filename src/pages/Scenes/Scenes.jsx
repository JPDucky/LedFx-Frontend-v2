import { useState, useEffect } from 'react';
import useStore from '../../utils/apiStore';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Divider, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Card, CardActionArea, CardActions, CardMedia, Icon, Typography } from '@material-ui/core';
import { Info } from '@material-ui/icons';
import Popover from '../../components/Popover';
import NoYet from '../../components/NoYet';
import BladeIcon from '../../components/Icons/BladeIcon';

const useStyles = makeStyles({
  root: {
    width: 'min(95vw, 345px)',
  },
  '@media (max-width: 580px)': {
    root: {
      width: '95vw',
    },
    sceneTitle: {
      fontSize: '1rem',
    }
  },
  media: {
    height: 140,
  },
  iconMedia: {
    height: 140,
    display: 'flex',
    alignItems: 'center',
    margin: '0 auto',
    fontSize: 100,
    '& > span:before': {
      position: 'relative',
    },
  },
});

const Scenes = () => {
  const classes = useStyles();
  const getScenes = useStore((state) => state.getScenes);
  const scenes = useStore((state) => state.scenes);
  const activateScene = useStore((state) => state.activateScene);
  const deleteScene = useStore((state) => state.deleteScene);
  const [info, setInfo] = useState(false);
  const [scene, setScene] = useState();

  const setDialogOpenAddScene = useStore((state) => state.setDialogOpenAddScene);

  const handleActivateScene = (e) => {
    activateScene(e);
    setDialogOpenAddScene(false);
  };

  const handleDeleteScene = (e) => {
    deleteScene(e).then(() => {
      getScenes();
    });
    setDialogOpenAddScene(false);
  };

  const handleInfoOpen = (s) => {
    setScene(s)
    setInfo(true);
  };

  const handleInfoClose = () => {
    setInfo(false);
  };

  const sceneImage = (iconName) => iconName && iconName.startsWith('image:')
    ? <CardMedia
      className={classes.media}
      image={iconName.split('image:')[1]}
      title="Contemplative Reptile"
    />
    : <BladeIcon scene className={classes.iconMedia} name={iconName} />

  const SceneDialog = () => scene ? <Dialog
    open={info}
    onClose={handleInfoClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    fullWidth={true}
    maxWidth={"xs"}
  >
    <DialogTitle id="alert-dialog-title">Scene: {scenes[scene].name || scene}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        <div style={{ display: 'flex', justifyContent: 'space-between', fontVariant: 'all-small-caps' }}>
          <span>Device</span>
          <span>Effect</span>
        </div>
        <Divider />
        {Object.keys(scenes[scene].virtuals).filter(d => !!scenes[scene].virtuals[d].type).map((dev, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontVariant: 'all-small-caps' }}>
            <span>{dev}</span>
            <span>{scenes[scene].virtuals[dev].type}</span>
          </div>
        ))}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleInfoClose} color="primary" autoFocus>
        Close
      </Button>
    </DialogActions>
  </Dialog> : <></>

  useEffect(() => {
    getScenes();
  }, [getScenes]);
  return (
    <Grid container spacing={2} justifyContent="center">
      {scenes && Object.keys(scenes).length ? Object.keys(scenes).map((s, i) => (
        <Grid item key={i}>
          <Card className={classes.root}>
            <CardActionArea style={{ background: '#090909' }} onClick={() => handleActivateScene({ id: s })}>
              {sceneImage(scenes[s].scene_image || 'Wallpaper')}
            </CardActionArea>
            <CardActions style={{ justifyContent: 'space-between', aligntItems: 'center', width: '100%' }}>
              <Typography gutterBottom className={classes.sceneTitle} variant={"h5"} component={"h2"}>
                {scenes[s].name || s}
              </Typography>
              <div>
                <Popover onConfirm={() => handleDeleteScene(s)} variant="outlined" color="inherit" />
                <Button onClick={() => handleInfoOpen(s)} variant="outlined" color="inherit" size="small" style={{ marginLeft: '0.5rem' }}>
                  <Info />
                </Button>

              </div>
            </CardActions>
          </Card>
          <SceneDialog />
        </Grid>
      )) : (<NoYet type="Scene" />)}
    </Grid>
  );
};

export default Scenes;
