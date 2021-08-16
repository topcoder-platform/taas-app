import React from "react";
import TextField from "@material-ui/core/TextField";
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
}));

function FormField({ label, name, handleInputValue, errors }) {
  const classes = useStyles();
  return (
    <Box m={1}>
      <TextField
        label={label}
        name={name}
        onBlur={handleInputValue}
        onChange={handleInputValue}
        fullWidth
        size="small"
        variant="outlined"
        InputLabelProps={{
          classes: {
            root: classes.label,
          },
        }}
        {...(errors[name] && { error: true, helperText: errors[name] })}
      />
    </Box>
  );
}

export default FormField;
