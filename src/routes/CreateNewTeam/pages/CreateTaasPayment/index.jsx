import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ThemeProvider } from "@material-ui/styles";
import { toastr } from "react-redux-toastr";

import PaymentForm from "./PaymentForm";
import PageHeader from "components/PageHeader";
import { calculateAmount } from "services/teams";
import Progress from "../../components/Progress";
import theme from "./theme";
import "./styles.module.scss";

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);
const CreateTassPayment = () => {
  const [calculatedAmount, setCalculatedAmount] = useState(0);
  const { addedRoles } = useSelector((state) => state.searchedRoles);

  // Backend has wrong test data so created dummy data for logic to work
  const dummyRates = {
    global: 50,
    rate20Global: 20,
    rate30Global: 20,
  };

  useEffect(() => {
    const obj = {
      numberOfResources: addedRoles.numberOfResources || 1,
      rates: dummyRates.global,
      durationWeeks: addedRoles.durationWeeks || 1,
    };
    calculateAmount(obj)
      .then((res) => {
        setCalculatedAmount(res.data.totalAmount);
      })
      .catch((err) => {
        toastr.error("Error Requesting Team", err.message);
      });
  });

  const stages = [
    { name: "Input Job Description", completed: true },
    { name: "Search Member", completed: true },
    { name: "Overview of the Results", completed: true },
    { name: "Refundable Deposite Payment", isCurrent: true },
  ];

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
                  {addedRoles.map((role) => (
                    <div styleName="role-container">
                      <div styleName="roles">
                        <img
                          styleName="image"
                          src={addedRoles.imageUrl}
                          alt="role"
                        />
                        <div>
                          <p styleName="title">{role.name}</p>
                          <ul styleName="details">
                            <li>
                              {role.numberOfResources} x ${dummyRates.global}/
                              Week
                            </li>
                            <li>{role.durationWeeks} Week Duration</li>
                            <li>
                              {role.hoursPerWeek
                                ? "Part-Time Availability"
                                : "Full-Time Availability"}
                            </li>
                          </ul>
                        </div>
                        <p styleName="amount">
                          ${role.numberOfResources * dummyRates.global}
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
