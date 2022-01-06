import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { ListItem, ListItemIcon, ListItemText, Drawer, List, Icon, Divider, IconButton } from '@material-ui/core';
import { useLocation, Link } from 'react-router-dom';
import useStore from '../../utils/apiStore';
import useStyles from './BarLeft.styles';
import logoAsset from '../../assets/logo.png';
import BladeIcon from '../Icons/BladeIcon';
import isElectron from 'is-electron';

const LeftBar = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { pathname } = useLocation();
  const virtuals = useStore((state) => state.virtuals);
  const open = useStore((state) => state.ui.bars?.leftBar.open);
  const setOpen = useStore((state) => state.setLeftBarOpen);
  const smallScreen = useMediaQuery('(max-width:768px)');

  const handleDrawerClose = () => {
    setOpen(false)
  };

  const logo = (
    <div className={classes.logo}>
      {!isElectron() && <a href="/#" className={classes.logoLink}>
        <div className={classes.logoImage}>
          <img src={logoAsset} alt="logo" className={classes.img} />
        </div>
        LedFx
      </a>}
      <div className={classes.devbadge} onClick={() => window.localStorage.setItem('BladeMod', 0)} />
    </div>
  );

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        {logo}
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </div>
      <Divider />
      <List>
        {Object.keys(virtuals).map((d, i) => (
          <Link
            style={{ textDecoration: 'none' }}
            key={i}
            to={`/device/${virtuals[d].id}`}
            onClick={() => {
              smallScreen && handleDrawerClose();
            }}
          >
            <ListItem className={
              (pathname.split('/').length === 3 && pathname.split('/')[1] === 'device' && pathname.split('/')[2] === d) ? classes.activeView : classes.dummy
            } button key={virtuals[d].config.name}>
              <ListItemIcon>
                <BladeIcon
                  style={{ position: 'relative' }}
                  colorIndicator={!(pathname.split('/').length === 3 && pathname.split('/')[1] === 'device' && pathname.split('/')[2] === d) && Object.keys(virtuals[d]?.effect).length > 0}
                  name={virtuals && virtuals[d] && virtuals[d].config && virtuals[d].config.icon_name && virtuals[d].config.icon_name} />
              </ListItemIcon>
              <ListItemText
                style={{ color: !(pathname.split('/').length === 3 && pathname.split('/')[1] === 'device' && pathname.split('/')[2] === d) && Object.keys(virtuals[d]?.effect).length > 0 ? theme.palette.primary.light : theme.palette.text.primary }}
                primary={virtuals[d].config.name}
              />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
};

export default LeftBar;
