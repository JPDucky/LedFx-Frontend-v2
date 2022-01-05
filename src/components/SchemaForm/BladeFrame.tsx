import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    minWidth: '200px',
    padding: '16px 1.2rem 6px 1.2rem',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    height: 'auto',
    margin: '0.5rem 0',
    '@media (max-width: 580px)': {
      width: '100% !important',
      margin: '0.5rem 0',
    },
    '& > label': {
      top: '-0.5rem',
      display: 'flex',
      alignItems: 'center',
      left: '1rem',
      padding: '0 0.3rem',
      position: 'absolute',
      fontVariant: 'all-small-caps',
      fontSize: '0.9rem',
      letterSpacing: '0.1rem',
      color: theme.palette.text.secondary,
      backgroundColor: theme.palette.background.paper,
      boxSizing: 'border-box',
    },
  },
}));

interface BladeFrameProps {
  title?: string;
  children?: any;
  full?: boolean;
  style?: any;
  required?: boolean;
  variant?: 'outlined' | 'contained' | 'inherit';
  className?: any;
  disabled?: boolean;
}

const BladeFrame = ({
  title,
  children,
  full = false,
  style = { width: 'unset', order: 0 },
  required = false,
  variant = 'outlined',
  className,
  disabled,
}: BladeFrameProps) => {
  const classes = useStyles();
  return variant === 'outlined' ? (
    <div
      className={`${classes.wrapper} ${className}`}
      style={{
        ...style,
        width: full ? '100%' : style.width,
      }}
    >
      {/* eslint-disable-next-line */}
      <label className={`MuiFormLabel-root${disabled ? ' Mui-disabled' : ''}`}>
        {title}
        {required ? '*' : ''}
      </label>
      {children}
    </div>
  ) : (
    children
  );
};

BladeFrame.defaultProps = {
  title: undefined,
  children: undefined,
  full: false,
  style: {
    width: 'unset',
    order: 0,
  },
  required: false,
  variant: 'outlined',
  className: undefined,
  disabled: undefined,
};

export default BladeFrame;
