import useStore from "../../utils/apiStore";
import { useState } from "react";

import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  FormRow: {
    display: "flex",
    flexDirection: "row",
    border: "1px solid #999",
    borderRadius: "10px",
    margin: "0 0 0.5rem",
    "@media (max-width: 580px)": {
      flexDirection: "column",
    },
  },
  FormLabel: {
    marginLeft: "1rem",
    paddingTop: "0.5rem",
    "@media (max-width: 580px)": {
      display: "none",
    },
  },
  FormSelect: {
    flexGrow: 1,
    marginLeft: "1rem",
    paddingTop: "0.5rem",
    "&:before, &:after": {
      display: "none",
    },
    "& > .MuiSelect-select:focus": {
      backgroundColor: "unset",
    },
  },
  FormListHeaders: {
    background: theme.palette.primary.main,
    color: "#fff",
  },
  FormListItem: {
    paddingLeft: "2rem",
  },
  FormToggleWrapper: {
    "@media (max-width: 580px)": {
      order: -1,
    },
  },

  FormToggle: {
    "@media (max-width: 580px)": {
      flexGrow: 1,
    },
  },
}));

const BladeEffectDropDown = ({ effects, display }) => {
  const classes = useStyles();
  const setDisplayEffect = useStore((state) => state.setDisplayEffect);
  const getDisplays = useStore((state) => state.getDisplays);

  const effectNames =
    effects &&
    Object.keys(effects).map((eid) => ({
      name: effects[eid].name,
      id: effects[eid].id,
      category: effects[eid].category,
    }));

  let group =
    effectNames &&
    effectNames.reduce((r, a) => {
      r[a.category] = [...(r[a.category] || []), a];
      return r;
    }, {});

  const [formats, setFormats] = useState(
    () => group && Object.keys(group).map((c) => c || [])
  );

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };
  const onEffectTypeChange = (e) =>
    setDisplayEffect(display.id, {
      type: e.target.value,
    }).then(() => {
      getDisplays()
    });

  return (
    <>
      <FormControl className={classes.FormRow}>
        <InputLabel htmlFor="grouped-select" className={classes.FormLabel}>
          Effect Type
        </InputLabel>
        <Select
          defaultValue={display && display.effect && display.effect.type}
          onChange={(e) => onEffectTypeChange(e)}
          id="grouped-select"
          className={classes.FormSelect}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {effects &&
            group &&
            Object.keys(group).map(
              (c) =>
                formats &&
                formats.indexOf(c) !== -1 && [
                  <ListSubheader
                    className={classes.FormListHeaders}
                    color="primary"
                  >
                    {c}
                  </ListSubheader>,
                  group[c].map((e) => (
                    <MenuItem className={classes.FormListItem} value={e.id}>
                      {e.name}
                    </MenuItem>
                  )),
                ]
            )}
        </Select>
        <ToggleButtonGroup
          value={formats}
          onChange={handleFormat}
          aria-label="text formatting"
          className={classes.FormToggleWrapper}
        >
          {effects &&
            Object.keys(group).map((c, i) => (
              <ToggleButton
                className={classes.FormToggle}
                key={i}
                value={c}
                aria-label={c}
              >
                {c}
              </ToggleButton>
            ))}
        </ToggleButtonGroup>
      </FormControl>
    </>
  );
};

export default BladeEffectDropDown;
