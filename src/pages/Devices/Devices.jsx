import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useStore from '../../utils/apiStore';
import DeviceCard from './DeviceCard';


const useStyles = makeStyles((theme) => ({
  cardWrapper: {
    display: 'flex', flexWrap: 'wrap', margin: '-0.5rem',
  },
  '@media (max-width: 580px)' : {
    cardWrapper:{
      justifyContent: 'center'
    }
  }
}));

const Devices = () => {
  const classes = useStyles();
  const getDisplays = useStore((state) => state.getDisplays);
  const displays = useStore((state) => state.displays);
  const setPixelGraphs = useStore((state) => state.setPixelGraphs);
  const graphs = useStore((state) => state.graphs);

  useEffect(() => {
    getDisplays();
  }, [getDisplays]);

  useEffect(() => {
    if (graphs) {
      setPixelGraphs(Object.keys(displays))
    }
  }, [graphs, setPixelGraphs]);
  // }, [graphs, displays, setPixelGraphs]);

  return (
      <div className={classes.cardWrapper}>
        {displays && Object.keys(displays).length ? Object.keys(displays).map((display, i) => (
          <DeviceCard display={display} key={i} />
        )) : (<>No devices yet</>)}
      </div>
  );
};

export default Devices;
