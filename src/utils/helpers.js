/**
 * Helper utilities
 *
 * This file should contain helper methods which cannot be grouped into a separate file like we did for "format.js".
 * If there are multiple methods which could be grouped into a separate file by their meaning they should be extracted from here to not make this file too big.
 */
import _ from "lodash";
import faker from "faker";

/**
 * Delay code for some milliseconds using promise.
 *
 * @param {Number} duration duration in milliseconds
 *
 * @returns {Promise<void>} promise
 */
export const delay = (duration) =>
  new Promise((resolve) => {
    setTimeout(resolve, duration);
  });

/**
 * Returns the option from list of option by value
 *
 * @param {any} value value of option
 * @param {[{ label: string, value: any }]} selectOptions list of option
 *
 * @returns {{ label: string, value: any }} select option
 */
export const getSelectOptionByValue = (value, selectOptions) => {
  const option = _.find(selectOptions, { value });

  if (!option) {
    return {
      label: `Unsuppored value: ${value}`,
      value,
    };
  }

  return option;
};

/**
 * Generates a pseudorandom integer between two numbers (inclusive)
 *
 * @param {number} lowNum an integer to use as minimun
 * @param {number} highNum an integer to use as maximum
 * @returns {number} a psuedorandom number between low and high
 */
export const rollDice = (lowNum, highNum) => {
  const diffPlusOne = highNum - lowNum + 1;
  return Math.floor(Math.random() * diffPlusOne + lowNum);
};

export const getFakeInterviews = (candidate) => {
  // decide how many interviews to return
  const numInterviews = rollDice(1, 3);

  const interviews = [];
  for (let i = 0; i < numInterviews; i++) {
    const numEmails = rollDice(1, 5);
    const emails = _.times(numEmails, faker.internet.exampleEmail);

    const interview = {
      id: faker.datatype.uuid(),
      googleCalendarId: "",
      attendeesList: emails,
      startTimestamp: faker.date.recent(),
      custommessage: "",
      xaiTemplate: "",
      jobCandidates: candidate.id,
      round: i + 1,
      status: "Completed",
      createdBy: faker.datatype.uuid(),
      updatedBy: faker.datatype.uuid(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    };
    interviews.push(interview);
  }
  return interviews;
};
