/**
 * This file should contain all application constants which do not depend on the DEV/PROD environment.
 */

/**
 * Day format
 */
export const DAY_FORMAT = "MM/DD/YYYY";

/**
 * How many team member show per page by default
 */
export const TEAM_MEMBERS_PER_PAGE = 5;

/**
 * Position statuses
 */
export const POSITION_STATUS = {
  SOURCING: "sourcing",
  AVAILABLE_FOR_REVIEW: "availableForReview",
};

/**
 * Mapping between position status "server value" and human readable value
 */
export const POSITION_STATUS_TO_TEXT = {
  sourcing: "Sourcing",
  availableForReview: "Candidates Available for Review",
};

/**
 * Supported Button Sizes
 */
export const BUTTON_SIZE = {
  SMALL: "small",
  MEDIUM: "medium",
};

/**
 * Supported Button Types
 */
export const BUTTON_TYPE = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  WARNING: "warning",
};
