import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core/';
import useStore from '../../utils/apiStore';
import EffectsCard from './Effects';
import PresetsCard from './_Presets';
import TransitionCard from './Transition';
import MelbankCard from './Melbank';
import InfoCard from './_Info';

const useStyles = makeStyles((theme) => ({
  displayWrapper: {
    justifyContent: 'center',
    '@media (max-width: 1400px)': {
      justifyContent: 'flex-start',
    },
  },
  girdItem: { flexShrink: 0, flexGrow: 1, maxWidth: '540px', width: '100%' },
}));

const Device = ({
  match: {
    params: { displayId },
  },
}) => {
  const classes = useStyles();

  const getDisplays = useStore((state) => state.getDisplays);
  const getPresets = useStore((state) => state.getPresets);
  const getSchemas = useStore((state) => state.getSchemas);

  const displays = useStore((state) => state.displays);
  const presets = useStore((state) => state.presets);

  const display = displays[displayId];
  const effectType = display && display.effect.type;

  useEffect(() => {
    getDisplays();
    getSchemas();
    effectType && getPresets(effectType);
  }, [getDisplays, getSchemas, getPresets, effectType]);

  return (
    <Grid
      container
      direction="row"
      spacing={2}
      className={classes.displayWrapper}
    >
      {display && (
        <>
          <Grid item className={classes.girdItem}>
            <EffectsCard displayId={displayId} />
            <TransitionCard display={display} style={{ marginTop: '1rem' }} />
          </Grid>
          <Grid item className={classes.girdItem}>
            {effectType && presets && (
              <PresetsCard
                display={display}
                presets={presets}
                effectType={effectType}
                style={{ marginBottom: '1rem' }}
              />
            )}
            {parseInt(window.localStorage.getItem('BladeMod')) > 10 && <MelbankCard />}
          </Grid>
          {parseInt(window.localStorage.getItem('BladeMod')) > 10 && (
            <Grid item className={classes.girdItem}>
              <InfoCard display={display} style={{ marginTop: '1rem' }} />
            </Grid>
          )}
        </>
      )}
    </Grid>
  );
};

export default Device;
