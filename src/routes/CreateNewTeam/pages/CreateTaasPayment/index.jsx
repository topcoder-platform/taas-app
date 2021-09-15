import React, { useState, useEffect, useCallback } from "react";
import _ from "lodash";
import { useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ThemeProvider } from "@material-ui/styles";
import { toastr } from "react-redux-toastr";
import { isCustomRole } from "utils/helpers";

import PaymentForm from "./PaymentForm";
import PageHeader from "components/PageHeader";
import { calculateAmount } from "services/teams";
import Progress from "../../components/Progress";
import theme from "./theme";
import FallbackIcon from "../../../../assets/images/icon-role-fallback.svg";
import "./styles.module.scss";

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

const CreateTassPayment = () => {
  const [calculatedAmount, setCalculatedAmount] = useState(0);
  const [error, setError] = useState(false);
  const [value, setValue] = useState([]);
  const { addedRoles } = useSelector((state) => state.searchedRoles);

  useEffect(() => {
    const temp = [];
    const amount = [];

    addedRoles.map((role) => {
      const {
        imageUrl,
        name,
        rates: [rates],
        numberOfResources = 1,
        durationWeeks = 4,
        hoursPerWeek = "40",
      } = role;

      let rate;
      let availability;

      if (hoursPerWeek === "30") {
        rate = rates.rate30Global;
        availability = "Part-Time Availability";
      } else if (hoursPerWeek === "20") {
        rate = rates.rate20Global;
        availability = "Part-Time Availability";
      } else if (hoursPerWeek === "40") {
        rate = rates.global;
        availability = "Full-Time Availability";
      }

      temp.push({
        imageUrl,
        name,
        rate,
        numberOfResources,
        durationWeeks,
        availability,
      });
      if (!isCustomRole(role)) {
        amount.push({ rate, numberOfResources });
      }
    });
    setValue(temp);

    calculateAmount(amount)
      .then((res) => {
        setCalculatedAmount(res.data.totalAmount);
      })
      .catch((err) => {
        toastr.error("Error Requesting Team", err.message);
      });
  }, [addedRoles, setValue]);

  const stages = [
    { name: "Input Job Description", completed: true },
    { name: "Search Member", completed: true },
    { name: "Overview of the Results", completed: true },
    { name: "Refundable Deposit Payment", isCurrent: true },
  ];

  const onImgError = useCallback(() => setError(true), []);

  return (
    <div styleName="taas-payment">
      <div styleName="main-container">
        <div>
          <PageHeader
            title={<div styleName="page-title">Confirm your request</div>}
            backTo="/taas/createnewteam/role/result"
          />
          <div styleName="content-container">
            <div styleName="roles-container">
              <div styleName="summary">
                <p styleName="heading">summary</p>
                <div styleName="scroll">
                  {value.map((data) => (
                    <div styleName="role-container">
                      <div styleName="roles">
                        {data.imageUrl && !error ? (
                          <img
                            src={data.imageUrl}
                            onError={onImgError}
                            alt={data.name}
                            styleName="role-icon"
                          />
                        ) : (
                          <FallbackIcon styleName="role-icon" />
                        )}
                        <div>
                          <p styleName="title">{data.name}</p>
                          <ul styleName="details">
                            {!isCustomRole(data) && <li>
                              {data.numberOfResources} x ${data.rate}/ Week
                            </li>}
                            <li>{data.durationWeeks} Week Duration</li>
                            <li>{data.availability}</li>
                          </ul>
                        </div>
                        <p styleName="amount">
                          ${isCustomRole(data) ? '0' : data.numberOfResources * data.rate}
                        </p>
                      </div>
                      <hr styleName="divider" />
                    </div>
                  ))}
                </div>
              </div>
              <p styleName="heading terms-title">Deposit & Refund Terms</p>
              <ul styleName="terms">
                <li>This is a refundable deposit payment.</li>
                <li>
                  Topcoder will find you qualified candidates within 2 weeks, or
                  your money back.
                </li>
                <li>
                  If we find you talent that meets your needs, this deposit will
                  be credited towards your payment.
                </li>
                <li>
                  If we are only able to partially fill your talent order, we
                  will refund any portion we cannot fulfill.
                </li>
                <li>
                  Future payments can be processed on this credit card or you
                  can arrange invoicing.
                </li>
              </ul>
            </div>
            <div styleName="payment">
              <p styleName="amount">${calculatedAmount}</p>
              <p styleName="deposit">Total Deposit</p>
              <hr />
              <Elements stripe={stripePromise}>
                <ThemeProvider theme={theme}>
                  <PaymentForm calculatedAmount={calculatedAmount} />
                </ThemeProvider>
              </Elements>
            </div>
          </div>
        </div>
      </div>

      <Progress
        stages={stages}
        extraStyleName="role-selection final-step"
        disabled="true"
        percentage="97"
      />
    </div>
  );
};

export default CreateTassPayment;
