import { useEffect } from 'react';
import { Button, Card, CardContent } from '@material-ui/core/';
import { Casino, Delete } from '@material-ui/icons/';
import useStore from '../../utils/apiStore';
import BladeEffectDropDown from '../../components/SchemaForm/BladeEffectDropDown';
import BladeSchemaForm from '../../components/SchemaForm/BladeSchemaForm';

const EffectsCard = ({ displayId }) => {
  const getDisplays = useStore((state) => state.getDisplays);
  const getSchemas = useStore((state) => state.getSchemas);
  const clearDisplayEffect = useStore((state) => state.clearDisplayEffect);
  const setDisplayEffect = useStore((state) => state.setDisplayEffect);
  const displays = useStore((state) => state.displays);
  const effects = useStore((state) => state.schemas.effects);

  const display = displays[displayId];
  const effectType = display && display.effect.type;

  const handleRandomize = () => {
    setDisplayEffect({
      displayId: display.id,
      type: effectType,
      config: 'RANDOMIZE',
    });
  };

  const handleClearEffect = () => {
    clearDisplayEffect(displayId);
  };

  useEffect(() => {
    getDisplays();
    getSchemas();
  }, [getDisplays, getSchemas, effectType]);
  return (
    <Card style={{ width: '100%', maxWidth: '540px' }}>
      <CardContent>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '0 .5rem',
          }}
        >
          <h1>{display && display.config.name}</h1>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {effectType && (
              <Button
                onClick={() => handleRandomize()}
                variant="outlined"
                style={{ marginRight: '.5rem' }}
              >
                <Casino />
              </Button>
            )}
            <Button variant="outlined" onClick={() => handleClearEffect()}>
              <Delete />
            </Button>
          </div>
        </div>
        <BladeEffectDropDown
          displayId={displayId}
          effects={effects}
          display={display}
        />
        {displays
          && display
          && effects
          && display.effect
          && display.effect.config && (
          <BladeSchemaForm
            display={display}
            effects={effects}
            schema={effects[effectType].schema}
            model={display.effect.config}
            display_id={displayId}
            selectedType={effectType}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default EffectsCard;
