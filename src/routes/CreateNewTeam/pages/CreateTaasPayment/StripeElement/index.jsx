import React from "react";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import StripeInput from "./StripeInput";

function StripeElement({ element, icon, width }) {
  const [errorMessage, setErrorMessage] = React.useState(null);
  function handleElementChange({ error, elementType }) {
    if (error) {
      if (elementType === "cardNumber") {
        setErrorMessage("Credit card incomplete");
      } else setErrorMessage(error.message);
    } else {
      setErrorMessage(null);
    }
  }

  const hasError = errorMessage !== null;

  return (
    <Box m={1}>
      <TextField
        fullWidth
        variant="outlined"
        error={hasError}
        helperText={hasError ? errorMessage || "Invalid" : ""}
        onBlur={handleElementChange}
        onChange={handleElementChange}
        size="small"
        style={{ width }}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          inputProps: {
            component: element,
            icon,
          },
          inputComponent: StripeInput,
        }}
      />
    </Box>
  );
}

export default StripeElement;
