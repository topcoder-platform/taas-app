/**
 * User permission policies.
 * Can be used with `hasPermission` method.
 *
 * PERMISSION GUIDELINES
 *
 * All the permission name and meaning should define **WHAT** can be done having such permission
 * but not **WHO** can do it.
 *
 * Examples of CORRECT permission naming and meaning:
 *    - `VIEW_PROJECT`
 *    - `UPDATE_MILESTONE`
 *    - `DELETE_WORK`
 *
 * Examples of INCORRECT permissions naming and meaning:
 *    - `COPILOT_AND_MANAGER`
 *    - `PROJECT_MEMBERS`
 *    - `ADMINS`
 *
 * The same time **internally only** in this file, constants like `COPILOT_AND_ABOVE`,
 * `PROJECT_MEMBERS`, `ADMINS` could be used to define permissions.
 *
 * NAMING GUIDELINES
 *
 * There are unified prefixes to indicate what kind of permissions.
 * If no prefix is suitable, please, feel free to use a new prefix.
 *
 * CREATE_ - create somethings
 * READ_   - read something
 * UPDATE_ - update something
 * DELETE_ - delete something
 *
 * MANAGE_ - means combination of 3 operations CREATE/UPDATE/DELETE.
 *           usually should be used, when READ operation is allowed to everyone
 *           while 3 manage operations require additional permissions
 * ACCESS_ - means combination of all 4 operations READ/CREATE/UPDATE/DELETE.
 *           usually should be used, when by default users cannot even READ something
 *           and if someone can READ, then also can do other kind of operations.
 *
 * ANTI-PERMISSIONS
 *
 * If it's technically impossible to create permission rules for some situation in "allowed" manner,
 * in such case we can create permission rules, which would disallow somethings.
 * - Create such rules ONLY IF CREATING ALLOW RULE IS IMPOSSIBLE.
 * - Add a comment to such rules explaining why allow-rule cannot be created.
 */
/* eslint-disable no-unused-vars */
import _ from "lodash";

/**
 * Topcoder User roles
 *
 * Here we list only the part of the roles which might be used in the TaaS App
 */
export const TOPCODER_ROLE = {
  BOOKING_MANAGER: "bookingmanager",
  CONNECT_MANAGER: "Connect Manager",
  ADMINISTRATOR: "administrator",
  TOPCODER_USER: "Topcoder User",
  CONNECT_ADMIN: "Connect Admin",
  COPILOT_MANAGER: "Connect Copilot Manager",
};

/**
 * Project Member roles
 *
 * NOTE: Team in the TaaS app is same as Project in Connect App or Projects Serivce API
 *
 * Here we list only the part of the project member roles which are used in TaaS App
 */
export const PROJECT_ROLE = {
  CUSTOMER: "customer",
};

/*
 * The next sets of roles are exported for outside usage with `hasPermission` method.
 */

export const PERMISSIONS = {
  /**
   * Job
   */
  UPDATE_JOB_NOT_OWN: {
    meta: {
      group: "Job",
      title: "Edit Job (not own)",
      description: "Who can edit job created by some other user.",
    },
    topcoderRoles: [TOPCODER_ROLE.BOOKING_MANAGER, TOPCODER_ROLE.ADMINISTRATOR],
  },

  UPDATE_JOB_STATUS: {
    meta: {
      group: "Job",
      title: 'Edit Job "status"',
    },
    topcoderRoles: [TOPCODER_ROLE.BOOKING_MANAGER, TOPCODER_ROLE.ADMINISTRATOR],
  },

  /**
   * Job Candidate
   */
  UPDATE_JOB_CANDIDATE: {
    meta: {
      group: "Job Candidate",
      title: "Update Job Candidate",
    },
    projectRoles: true,
    topcoderRoles: [TOPCODER_ROLE.BOOKING_MANAGER, TOPCODER_ROLE.ADMINISTRATOR],
  },

  /**
   * Resource Booking
   */
  UPDATE_RESOURCE_BOOKING: {
    meta: {
      group: "Resource Booking",
      title: "Edit Resource Booking",
    },
    topcoderRoles: [TOPCODER_ROLE.BOOKING_MANAGER, TOPCODER_ROLE.ADMINISTRATOR],
  },

  ACCESS_RESOURCE_BOOKING_MEMBER_RATE: {
    meta: {
      group: "Resource Booking",
      title: "Access Member Rate (view and edit)",
    },
    topcoderRoles: [TOPCODER_ROLE.BOOKING_MANAGER, TOPCODER_ROLE.ADMINISTRATOR],
  },

  /**
   * Team
   */
  SEE_MEMBER_SUGGESTIONS: {
    meta: {
      group: "Team",
      title: "See Member Suggestions",
      description: "When entering user handle in the invite field.",
    },
    topcoderRoles: [
      TOPCODER_ROLE.ADMINISTRATOR,
      TOPCODER_ROLE.CONNECT_ADMIN,
      TOPCODER_ROLE.CONNECT_MANAGER,
      TOPCODER_ROLE.COPILOT_MANAGER,
    ],
  },
};
