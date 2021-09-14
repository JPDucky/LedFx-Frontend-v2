import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button, DialogTitle, DialogContent, DialogActions, Dialog, RadioGroup, Radio, FormControlLabel } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import useStore from '../../utils/apiStore';

function ConfirmationDialogRaw(props) {
    const { onClose, value: valueProp, open, ...other } = props;
    const [value, setValue] = React.useState(valueProp);
    const radioGroupRef = React.useRef(null);

    React.useEffect(() => {
        if (!open) {
            setValue(valueProp);
        }
    }, [valueProp, open]);

    const handleEntering = () => {
        if (radioGroupRef.current != null) {
            radioGroupRef.current.focus();
        }
    };

    const handleCancel = () => {
        onClose();
    };

    const handleOk = () => {
        onClose(value);
    };

    const handleChange = event => {
        setValue(event.target.value);
    };

    delete other.deviceList;
    // console.log(props.deviceList)
    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth="xs"
            onEntering={handleEntering}
            aria-labelledby="confirmation-dialog-title"
            open={open}
            {...other}
        >
            <DialogTitle id="confirmation-dialog-title">Select a device</DialogTitle>
            <DialogContent dividers>
                <RadioGroup
                    ref={radioGroupRef}
                    aria-label="ringtone"
                    name="ringtone"
                    value={value}
                    onChange={handleChange}
                >
                    {Object.keys(props.deviceList).map(device => (
                        <FormControlLabel
                            value={props.deviceList[device].id}
                            key={props.deviceList[device].id}
                            control={<Radio />}
                            label={props.deviceList[device].config.name}
                        />
                    ))}
                </RadioGroup>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCancel} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleOk} color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
}

ConfirmationDialogRaw.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
    config: PropTypes.any,
};

const useStyles = makeStyles(theme => ({
    root: {
        margin: '1rem auto',
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        width: '80%',
        maxHeight: 435,
    },
}));

export default function ConfirmationDialog({ virtual, config }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const deviceList = useStore(state => state.devices) || {};
    const updateVirtualSegments = useStore(state => state.updateVirtualSegments);
    const getVirtuals = useStore(state => state.getVirtuals);

    const handleClickListItem = () => {
        setOpen(true);
    };

    const handleClose = newValue => {
        setOpen(false);
        if (newValue) {
            const device = { ...deviceList[Object.keys(deviceList).find(d => deviceList[d].id === newValue)] };
            
            if (device && device.config) {
                const temp = [
                    ...virtual.segments,
                    [device.id, 0, device.config.pixel_count - 1, false],
                ];
                const test = temp.filter(t => t.length === 4);
                updateVirtualSegments({ virtId: virtual.id, segments: test }).then(()=>getVirtuals());
            }
        }
    };

    return (
        <div className={classes.root}>
            {deviceList && Object.keys(deviceList).length > 0 ? (
                <>
                    <Button
                        variant="contained"
                        color="primary"
                        aria-label="Add"
                        className={classes.button}
                        endIcon={<AddCircleIcon />}
                        onClick={handleClickListItem}
                        role="listitem"
                    >
                        ADD SEGMENT
                    </Button>

                    <ConfirmationDialogRaw
                        classes={{
                            paper: classes.paper,
                        }}
                        config={config}
                        id="ringtone-menu"
                        keepMounted
                        open={open}
                        onClose={handleClose}
                        value={"144"}
                        // value={deviceList[0].id}
                        deviceList={deviceList}
                    />
                </>
            ) : (
                <></>
            )}
        </div>
    );
}
