import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { navigate } from "@reach/router";
import { toastr } from "react-redux-toastr";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import { postTeamPayment, postTeamRequest } from "services/teams";
import { clearSearchedRoles } from "../../../actions";
import StripeElement from "../StripeElement";
import FormField from "../FormField";
import SelectField from "../SelectField";
import ConfirmationModal from "../../../components/ConfirmationModal";

import "./styles.module.scss";

const useStyles = makeStyles(() => ({
  typography: {
    margin: "10px 0px 2px 0px",
    color: "#2a2a2a",
    fontFamily: "Roboto",
    fontSize: "12px",
    textAlign: "left",
    fontWeight: "500",
  },
  button: {
    borderRadius: "20px",
    width: "258px",
    height: "40px",
  },
}));

const PaymentForm = ({ calculatedAmount }) => {
  const initialFormValues = {
    email: "",
    name: "",
    zipcode: "",
    formSubmitted: false,
    success: false,
  };

  const [formValues, setFormValues] = useState(initialFormValues);
  const [dropdownValue, setDropdownValue] = useState("");
  const [processing, setProcessing] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);
  const [errors, setErrors] = useState({card: true, cardExpire: true, cardCvc: true});
  const [clicked, setClicked] = useState(true);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const { teamObject } = useSelector((state) => state.searchedRoles);

  const handleDropdown = (value) => {
    setDropdownValue(value);
  };

  const validate = (fieldValues = formValues) => {
    let temp = {
      ...errors,
    };

    if ("name" in fieldValues)
      temp.name = fieldValues.name ? "" : "This field is required.";

    if ("email" in fieldValues) {
      temp.email = fieldValues.email ? "" : "This field is required.";
      if (fieldValues.email)
        temp.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email)
          ? ""
          : "Your email is incomplete.";
    }

    if ("zipcode" in fieldValues)
      temp.zipcode = fieldValues.zipcode ? "" : "This field is required.";

    setErrors({
      ...temp,
    });
  };
  const handleStripeElementError = (fieldName, error) => {
    errors[fieldName] = error ? true: false
    setErrors({
      ...errors,
    });
  }
  const handleInputValue = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    validate({
      [name]: value,
    });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (formIsValid() && clicked) {
      setClicked(false);
      setProcessing(true);
      postTeamPayment({ totalAmount: calculatedAmount })
        .then(async (res) => {
          const payload = await stripe.confirmCardPayment(
            res.data.paymentIntentToken,
            {
              payment_method: {
                card: elements.getElement(CardNumberElement),
                billing_details: {
                  address: {
                    state: dropdownValue,
                    postal_code: formValues.zipcode,
                  },
                  email: formValues.email,
                },
              },
            }
          );
          if (payload.error) {
            setProcessing(false);
            toastr.error("Payment failed", payload.error.message);
          } else if (payload.paymentIntent.status === "succeeded") {
            toastr.success("Payment is successful");
            setRequestLoading(true);
            postTeamRequest(teamObject)
              .then(() => {
                setTimeout(() => {
                  dispatch(clearSearchedRoles());
                  // Backend api create project has sync issue, so delay 2 seconds
                  navigate("/taas/myteams");
                }, 2000);
              })
              .catch((err) => {
                setRequestLoading(false);
                toastr.error("Error Requesting Team", err.message);
              });
          }
        })
        .catch((err) => {
          toastr.error("Error calculating amount", err.message);
        })
        .finally(() => {
          setClicked(true);
        });
    }
  };

  const formIsValid = (fieldValues = formValues) => {
    // check card valid
    const cardValid = !errors['card'] && !errors['cardExpire'] && !errors['cvc']
    const dropdown = dropdownValue === "" ? false : true;
    const isValid =
      fieldValues.email &&
      fieldValues.name &&
      fieldValues.zipcode &&
      dropdown && cardValid
      Object.values(errors).every((x) => x === "");

    return isValid;
  };

  const classes = useStyles();
  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <FormField
          label="Email"
          name="email"
          handleInputValue={handleInputValue}
          errors={errors}
        />
        <Box m={1}>
          <Typography classes={{ root: classes.typography }}>
            Card Information
          </Typography>
        </Box>
        <StripeElement onErrorChange={handleStripeElementError} element={CardNumberElement} name="card" icon="card" />
        <div styleName="horizontal">
          <StripeElement onErrorChange={handleStripeElementError} element={CardExpiryElement} name=""width="150px" name='cardExpire' />
          <StripeElement
            className={classes.cvc}
            name="cvc"
            element={CardCvcElement}
            onErrorChange={handleStripeElementError}
            icon="cvc"
            width="112px"
          />
        </div>
        <FormField
          label="Name on the card"
          name="name"
          handleInputValue={handleInputValue}
          errors={errors}
        />
        <SelectField
          handleDropdown={handleDropdown}
          dropdownValue={dropdownValue}
        />
        <FormField
          label="Zip code"
          name="zipcode"
          handleInputValue={handleInputValue}
          errors={errors}
        />
        <button
          type="submit"
          styleName={`button ${!formIsValid() ? "disabled" : ""}`}
        >
          {processing ? "Payment Processing" : `Pay $${calculatedAmount}`}
        </button>
      </form>
      <ConfirmationModal open={requestLoading} isLoading={requestLoading} />
    </>
  );
};

export default PaymentForm;
