import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core/';
import useStore from '../../utils/apiStore';
import EffectsCard from './Effects';
import PresetsCard from './Presets';
import TransitionCard from './Transition';
import MelbankCard from './Frequencies';
import StreamToCard from './StreamTo';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  virtualWrapper: {
    justifyContent: 'center',
  },
  girdItem: { flexShrink: 0, flexGrow: 1, maxWidth: '540px', width: '100%' },
}));

const Device = ({
  match: {
    params: { virtId },
  },
}) => {
  const classes = useStyles();

  const getVirtuals = useStore((state) => state.getVirtuals);
  const getPresets = useStore((state) => state.getPresets);
  const getSchemas = useStore((state) => state.getSchemas);
  const features = useStore((state) => state.features);

  const virtuals = useStore((state) => state.virtuals);
  const presets = useStore((state) => state.presets);

  const getV = () => {
    for (var prop in virtuals) {
      if (virtuals[prop].id == virtId) {
        return virtuals[prop];
      }
    }
  };

  const virtual = getV();
  // Object.keys(virtuals).length && virtuals.find((v) => v.id === virtId);

  const effectType = virtual && virtual.effect.type;

  useEffect(() => {
    getVirtuals();
    getSchemas();
    effectType && getPresets(effectType);
    console.log(virtual, effectType, presets, virtuals);
  }, [getVirtuals, getSchemas, getPresets, effectType]);

  console.log(virtual, effectType, presets, virtId);
  return (
    <Grid
      container
      direction="row"
      spacing={2}
      className={classes.virtualWrapper}
    >
      {virtual && (
        <>
          <Grid item className={classes.girdItem}>
            <EffectsCard virtId={virtId} />
          </Grid>

          <Grid item className={classes.girdItem}>
            {effectType && presets && (
              <PresetsCard
                virtual={virtual}
                presets={presets}
                effectType={effectType}
                style={{ marginBottom: '1rem' }}
              />
            )}
            {!(
              features['streamto'] ||
              features['transitions'] ||
              features['frequencies']
            ) && (
              <Typography
                variant={'body2'}
                color={'textSecondary'}
                align={'right'}
              >
                {' '}
                activate more advanced features with{' '}
                <Link style={{ color: 'inherit' }} to={'/Settings?ui'}>
                  {' '}
                  Expert-Mode
                </Link>
              </Typography>
            )}
            {features['streamto'] && (
              <StreamToCard virtuals={virtuals} virtual={virtual} />
            )}
            {features['transitions'] && (
              <TransitionCard virtual={virtual} style={{ marginTop: '1rem' }} />
            )}
            {features['frequencies'] && (
              <MelbankCard virtual={virtual} style={{ marginTop: '1rem' }} />
            )}
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Device;
