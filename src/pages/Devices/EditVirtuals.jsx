import React, {useEffect} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SaveIcon from '@material-ui/icons/Save';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

import { getOverlapping } from "../../utils/helpers";
import useStore from '../../utils/apiStore';

import AddSegmentDialog from './_AddSegmentDialog';
import Segment from './_Segment';

// import { updateDisplayConfig } from 'modules/displays';
// import { showdynSnackbar } from 'modules/ui';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
    marginBottom: '1rem',
    background: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  dialog: {
    background: theme.palette.background.default,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({
  display,
  icon,
  className,
  color = 'default',
  variant = 'contained',
}) {
  const classes = useStyles();
  const showSnackbar = useStore((state) => state.showSnackbar);
  const updateDisplaySegments = useStore((state) => state.updateDisplaySegments);
  
  const getDevices = useStore((state) => state.getDevices);
  const devices = useStore((state) => state.devices);

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // console.log(devices)
  useEffect(() => {
    getDevices()
  }, [getDevices])
 

  const handleSave = () => {
    const output = getOverlapping(display.segments);
    const overlap = Object.keys(output).find(k => output[k].overlap);

    if (overlap) {
        showSnackbar({
          message: `Overlapping in ${overlap} detected! Please Check your config`,
        })
    } else {
      updateDisplaySegments({ displayId: display.id, segments: display.segments });
      // setOpen(false);
    }
  };

  return display && display.config ? (
    <>
      <Button
        variant={variant}
        color={color}
        onClick={handleClickOpen}
        size="small"
        className={className}
      >
        {icon || <AddCircleIcon />}
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Button
              autoFocus
              color="primary"
              variant="contained"
              startIcon={<NavigateBeforeIcon />}
              onClick={handleClose}
              style={{ marginRight: '1rem' }}
            >
              back
                        </Button>
            <Typography variant="h6" className={classes.title}>
              {display.config.name}{' '}
            </Typography>
            <div>
              <Button
                autoFocus
                color="primary"
                variant="contained"
                endIcon={<SaveIcon />}
                onClick={handleSave}
              >
                save
                            </Button>
            </div>
          </Toolbar>
        </AppBar>

        <div
          style={{
            display: 'flex',
            borderBottom: '1px dashed #aaa',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.5rem 0',
            margin: '0 1rem',
          }}
        >
          <Typography variant="caption">Segments-Settings</Typography>
        </div>
        {display.segments.length > 0 &&
          display.segments.map((s, i) => (
            <Segment s={s} i={i} key={i} display={display} />
          ))}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.5rem 0',
            margin: '0 1rem',
          }}
        >
          <AddSegmentDialog display={display} />
        </div>
      </Dialog>
    </>
  ):(<></>);
}
