/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
import { useTheme, Stack } from '@mui/material';
import { useState } from 'react';
import BladeFrame from '../../components/SchemaForm/components/BladeFrame';
import DbButton from './DbButton';
import GlobalActionBar from '../../components/GlobalActionBar';
import useStore from '../../store/useStore';
import { deleteFrontendConfig, sleep } from '../../utils/helpers';

const DbGlobalActions = () => {
  const theme = useTheme();
  const [scanning, setScanning] = useState(-1);
  const paused = useStore((state) => state.paused);
  const togglePause = useStore((state) => state.togglePause);
  const scanForDevices = useStore((state) => state.scanForDevices);
  const getDevices = useStore((state) => state.getDevices);
  const getVirtuals = useStore((state) => state.getVirtuals);

  const handleScan = () => {
    setScanning(0);
    scanForDevices()
      .then(async () => {
        for (let sec = 1; sec <= 30; sec++) {
          await sleep(1000).then(() => {
            getDevices();
            getVirtuals();
            setScanning(sec);
          });
        }
      })
      .then(() => {
        setScanning(-1);
      });
  };

  return (
    <BladeFrame
      labelStyle={{
        background: theme.palette.background.default,
        color: theme.palette.primary.main,
      }}
      style={{ borderColor: theme.palette.primary.main, paddingLeft: 10 }}
      title="Global Actions"
    >
      <Stack width="100%">
        <GlobalActionBar type="indicator" />
        <div style={{ height: 10 }} />
        <DbButton
          onClick={() => togglePause()}
          icon={paused ? 'PlayArrow' : 'PauseOutlined'}
          text="Play"
        />
        <DbButton
          onClick={() => handleScan()}
          icon="wled"
          text={
            scanning > -1
              ? `Scanning ${Math.round((scanning / 30) * 100)}%`
              : 'Scan for WLED devices'
          }
        />
        <DbButton
          onClick={() => deleteFrontendConfig()}
          icon="Delete"
          text="Delete Client Data"
        />
      </Stack>
    </BladeFrame>
  );
};

export default DbGlobalActions;
