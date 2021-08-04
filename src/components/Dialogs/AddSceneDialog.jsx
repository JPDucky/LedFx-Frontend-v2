import { useState } from 'react';
import useStore from '../../utils/apiStore';
import { Link, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Typography } from '@material-ui/core';

const AddSceneDialog = () => {  
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [overwrite, setOverwrite] = useState(false)

  const addScene = useStore((state) => state.addScene);
  const getScenes = useStore((state) => state.getScenes);
  const scenes = useStore((state) => state.scenes);
  const open = useStore((state) => state.dialogs.addScene?.open || false);
  const setDialogOpenAddScene = useStore((state) => state.setDialogOpenAddScene);

  const handleClose = () => {
    setDialogOpenAddScene(false);
  };
  const handleAddScene = (e) => {

    addScene({ name, scene_image: image }).then(() => {
      getScenes();
    });
    setName('');
    setImage('');
    setDialogOpenAddScene(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
    <DialogTitle id="form-dialog-title">Add Scene</DialogTitle>
    <DialogContent>
      <DialogContentText>

        Image is optional and can be one of:
        <ul style={{ paddingLeft: '1rem' }}>
        <li>iconName <Link href="https://material-ui.com/components/material-icons/">Find MUI icons here</Link>        
        <Typography variant="subtitle1"><em>eg. flare, AccessAlarms</em></Typography></li>
        <li>mdi:icon-name <Link href="https://materialdesignicons.com">Find Material Design icons here</Link>
        <Typography variant="subtitle1"><em>eg. mdi:balloon, mdi:led-strip-variant</em></Typography></li>
        <li>image:custom-url
        <Typography variant="subtitle1"><em>eg. image:https://i.ytimg.com/vi/4G2unzNoOnY/maxresdefault.jpg</em></Typography></li>
        </ul>
      </DialogContentText>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={(e) => {          
          setOverwrite(Object.keys(scenes).indexOf(e.target.value.toLowerCase()) > -1)
        }}
        error={overwrite}
        helperText={overwrite && "Scene already existing!"}
        required
        fullWidth
      />
      <TextField
        margin="dense"
        id="scene_image"
        label="Image"
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        fullWidth
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>
        Cancel
      </Button>
      <Button onClick={handleAddScene}>
      {overwrite ? 'Overwrite' : 'Add'}
      </Button>
    </DialogActions>
  </Dialog>
  )
}

export default AddSceneDialog
