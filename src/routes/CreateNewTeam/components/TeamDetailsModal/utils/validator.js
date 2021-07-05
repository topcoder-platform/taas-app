const validateName = (name) => {
  if (!name || name.trim().length === 0) {
    return "Please enter a team name.";
  }
  return undefined;
};

const validateNumber = (number) => {
  const converted = Number(number);

  if (
    Number.isNaN(converted) ||
    converted !== Math.floor(converted) ||
    converted < 1
  ) {
    return "Please enter a positive integer";
  }
  return undefined;
};

const validateMonth = (monthString) => {
  const then = new Date(monthString);
  const now = new Date();
  const thenYear = then.getFullYear();
  const nowYear = now.getFullYear();
  const thenMonth = then.getMonth();
  const nowMonth = now.getMonth();

  if (thenYear < nowYear || (thenYear === nowYear && thenMonth < nowMonth)) {
    return "Start month may not be before current month";
  }
  return undefined;
};

const validateRole = (role) => {
  const roleErrors = {};
  roleErrors.numberOfResources = validateNumber(role.numberOfResources);
  roleErrors.durationWeeks = validateNumber(role.durationWeeks);
  if (role.startMonth) {
    roleErrors.startMonth = validateMonth(role.startMonth);
  }

  return roleErrors;
};

const validator = (values) => {
  const errors = {};

  errors.teamName = validateName(values.teamName);

  for (const key of Object.keys(values)) {
    if (key === "teamDescription" || key === "teamName") continue;
    errors[key] = validateRole(values[key]);
  }

  return errors;
};

const validateExists = (value) => {
  return value === undefined ? "Please enter a positive integer" : undefined;
};

export { validator, validateExists };
