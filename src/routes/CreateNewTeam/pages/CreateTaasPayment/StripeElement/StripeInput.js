import React from "react";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  icon: {
    color: "#AAAAAA",
    fontSize: "20px",
    marginRight: "5px",
  },
}));

function StripeInput(props) {
  const { component: Component, inputRef, icon, ...other } = props;
  const elementRef = React.useRef();

  React.useImperativeHandle(inputRef, () => ({
    focus: () => elementRef.current.focus,
  }));

  const classes = useStyles();
  return (
    <>
      <Component
        onReady={(element) => (elementRef.current = element)}
        {...other}
      />
      {icon === "card" ? (
        <CreditCardIcon className={classes.icon} />
      ) : (
        <>
          {icon === "cvc" ? <HelpOutlineIcon className={classes.icon} /> : ""}
        </>
      )}
    </>
  );
}

export default StripeInput;
