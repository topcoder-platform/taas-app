import React, { useCallback, useState } from "react";
import _ from "lodash";
import PT from "prop-types";
import { useDispatch } from "react-redux";
import { toastr } from "react-redux-toastr";
import { addMembers } from "../../actions";
import Button from "components/Button";
import BaseModal from "components/BaseModal";
import AsyncSelect from "components/AsyncSelect";
import "./styles.module.scss";
import { formatPlural } from "utils/format";
import { getMemberSuggestions } from "services/teams";

/**
 * Fetches suggestions based on input in select box
 * @param {string} inputVal Input from select
 * 
 * @returns {Promise<Array>} A promise that resolves to list of suggested users 
 */
const loadSuggestions = inputVal => {
  return getMemberSuggestions(inputVal)
    .then(res => {
      const users = _.get(res, "data.result.content", []);
      return users.map(user => ({
        label: user.handle,
        value: user.handle
      }))
    })
    .catch(() => {
      console.warn("could not get suggestions");
      return [];
    }) 
}

/**
 * Function to call if user does not have permission to see suggestions
 * @returns {Promise<Array>} Promise resolving to empty array
 */
const emptySuggestions = () => {
  return new Promise(resolve => {
    resolve([]);
  })
}

/**
 * Filters selected members, keeping those who could not be added to team
 * @param {Object[]} members The list of selected members
 * @param {Object[]} failedList The list of members who could not be added
 *
 * @returns {Object[]} The filtered list
 */
const filterFailed = (members, failedList) => {
  return members.filter((member) => {
    return _.some(failedList, (failedMem) => {
      if (failedMem.email) {
        return failedMem.email === member.label;
      }
      return failedMem.handle === member.label;
    });
  });
};

/**
 * Groups users by error message so they can be displayed together
 * @param {Object[]} errorList A list of errors returned from server
 *
 * @returns {string[]} A list of messages, ready to be displayed
 */
const groupErrors = (errorList) => {
  const grouped = _.groupBy(errorList, "error");

  const messages = Object.keys(grouped).map((error) => {
    const labels = grouped[error].map((failure) =>
      failure.email ? failure.email : failure.handle
    );

    return {
      message: error,
      users: labels,
    };
  });

  return messages.map((msg) => `${msg.users.join(", ")}: ${msg.message}`);
};

const AddModal = ({ open, onClose, teamId, validateAdds, showSuggestions }) => {
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState(false);
  const [responseErrors, setResponseErrors] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    setSelectedMembers([]);
    setValidationError(false);
    setResponseErrors([]);
    onClose();
  }, [onClose]);

  const submitAdds = useCallback(() => {
    const handles = [];
    const emails = [];
    selectedMembers.forEach((member) => {
      const val = member.label;
      if (member.isEmail) {
        emails.push(val.toLowerCase());
      } else {
        handles.push(val);
      }
    });

    setLoading(true);

    dispatch(addMembers(teamId, handles, emails))
      .then((res) => {
        setLoading(false);
        const { success, failed } = res.value;
        if (success.length) {
          const numAdds = success.length;
          toastr.success(
            "Members Added",
            `Successfully added ${formatPlural(numAdds, 'member')}`
          );
        }

        if (failed.length) {
          const remaining = filterFailed(selectedMembers, failed);
          const errors = groupErrors(failed);

          setSelectedMembers(remaining);
          setResponseErrors(errors);
        } else {
          handleClose();
        }
      })
      .catch((err) => {
        setLoading(false);

        // Display message from server error, else display generic message
        if (!!err.response) {
          setResponseErrors([err.message]);
        } else {
          setResponseErrors(["Error occurred when adding members"]);
        }
      });
  }, [dispatch, selectedMembers, teamId]);

  const onInputChange = useCallback(
    (val) => {
      const spaceIndex = val.indexOf(" ");
      const semiColonIndex = val.indexOf(";");

      // use space or semi-colon to add a member
      if (spaceIndex === 0 || semiColonIndex === 0) return "";
      if (spaceIndex >= 1 || semiColonIndex >= 1) {
        val = val.slice(0, -1);
        onUpdate([...selectedMembers, { label: val, value: val }]);
        return "";
      }
    },
    [selectedMembers]
  );

  const onUpdate = useCallback(
    (arr) => {
      const normalizedArr = arr.map((member) => ({
        ...member,
        isEmail: /(.+)@(.+){2,}\.(.+){2,}/.test(member.label),
      }));

      setSelectedMembers(normalizedArr);

      const isAlreadySelected = validateAdds(normalizedArr);

      if (isAlreadySelected) setValidationError(true);
      else setValidationError(false);

      setResponseErrors([]);
    },
    [validateAdds]
  );

  const addButton = (
    <Button
      type="primary"
      size="medium"
      onClick={submitAdds}
      disabled={loading || selectedMembers.length < 1 || validationError}
    >
      Add
    </Button>
  );

  return (
    <BaseModal
      open={open}
      onClose={handleClose}
      button={addButton}
      title="Add more people"
      disabled={loading}
      extraModalStyle={{ overflowY: "visible" }}
    >
      <AsyncSelect
        value={selectedMembers}
        onChange={onUpdate}
        cacheOptions
        onInputChange={onInputChange}
        isMulti
        placeholder="Enter email address(es) or user handles"
        noOptionsText="Type to search"
        loadingText="Loading..."
        loadOptions={showSuggestions ? loadSuggestions: emptySuggestions}
        defaultOptions={[]}
      />
      {validationError && (
        <div styleName="error-message">
          Project member(s) can't be added again. Please remove them from list
        </div>
      )}
      {responseErrors.length > 0 && (
        <div styleName="error-message">
          {responseErrors.map((err) => (
            <p>{err}</p>
          ))}
        </div>
      )}
    </BaseModal>
  );
};

AddModal.propTypes = {
  open: PT.bool,
  onClose: PT.func,
  teamId: PT.string,
  validateAdds: PT.func,
  showSuggestions: PT.bool,
};

export default AddModal;
