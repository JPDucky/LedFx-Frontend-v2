import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Button, IconButton } from '@material-ui/core';
import { Info } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        minWidth: '200px',
        padding: '16px 1.2rem 6px 1.2rem',
        border: '1px solid rgba(255, 255, 255, 0.23)',
        borderRadius: '10px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        height: 'auto',
        margin: '0.5rem 0',
        "@media (max-width: 580px)": {
            width: '100% !important',
            margin: '0.5rem 0',
        },
        '& > label': {
            top: '-0.7rem',
            display: 'flex',
            alignItems: 'center',
            left: '1rem',
            padding: '0 0.3rem',
            position: 'absolute',
            fontVariant: 'all-small-caps',
            backgroundColor: theme.palette.background.paper,
            boxSizing: 'border-box',
        },
    },
}));

const BladeFrame = ({ title, children, full = false, style = { width: 'unset' }, order, required = false, variant = 'outlined', className }) => {
    const classes = useStyles();
    return (variant === 'outlined' ? (
        <div className={`${classes.wrapper} ${className}`} style={{
            ...style,
            order: order || (title === 'Name' ? -2 : required ? -1 : 1),
            width: full ? '100%' : style.width
        }}>
            <label className={'MuiFormLabel-root'} onClick={()=>alert(1)}>{title}{required ? '*' : ''}</label>
            {children}
        </div>
    ) : (
        children
    ))
}

export default BladeFrame
