import React, { useState } from "react";
import { TextField, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(() => ({
  label: {
    color: "#AAAAAA",
    fontFamily: "Roboto",
    fontSize: "14px",
    textAlign: "left",
    "&.Mui-focused": {
      color: "#137D60",
      background: "#fffff",
    },
    "&.Mui-error": {
      color: "#EF476F",
    },
  },
  menuItems: {
    fontFamily: "Roboto",
    fontSize: "14px",
    textAlign: "left",

    "&.Mui-selected": {
      background: "#137D60",
      color: "#ffffff",
    },
    "&:hover": {
      background: "#137D60",
      color: "#ffffff",
    },
  },
}));

import countries from "./countries";

function SelectField({ dropdownValue, handleDropdown }) {
  const [error, setError] = useState(false);
  const handleChange = (event) => {
    if (event.target.value === "") {
      setError(true);
    } else {
      handleDropdown(event.target.value);
      setError(false);
    }
  };

  const classes = useStyles();
  return (
    <Box m={1}>
      <TextField
        id="standard-select-currency"
        select
        size="small"
        variant="outlined"
        label="Country or region"
        error={error}
        helperText={error ? "This field is require." : ""}
        value={dropdownValue}
        onBlur={handleChange}
        onChange={handleChange}
        fullWidth
        SelectProps={{
          MenuProps: {
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            getContentAnchorEl: null,
          },
        }}
        InputLabelProps={{
          classes: {
            root: classes.label,
          },
        }}
      >
        {countries.map((country) => (
          <MenuItem
            key={country.code}
            value={country.country}
            classes={{ root: classes.menuItems }}
          >
            {country.country}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}

export default SelectField;
