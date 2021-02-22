import React, { useCallback, useState } from "react";
import _ from "lodash";
import PT from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { toastr } from "react-redux-toastr";
import { loadSuggestions, clearSuggestions, addMembers } from "../../actions";
import Button from "components/Button";
import BaseModal from "components/BaseModal";
import ReactSelect from "components/ReactSelect";
import "./styles.module.scss";

// Minimum length of input for suggestions to trigger
const SUGGESTION_TRIGGER_LENGTH = 3;

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
  const options = useSelector((state) =>
    state.teamMembers.suggestions.map((sugg) => ({
      label: sugg.handle,
      value: sugg.handle,
    }))
  );
  const dispatch = useDispatch();

  const debouncedLoadSuggestions = _.debounce(
    (arg) => {
      dispatch(loadSuggestions(arg));
    },
    500,
    { leading: true }
  );

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
          const plural = numAdds !== 1 ? "s" : "";
          toastr.success(
            "Members Added",
            `Successfully added ${numAdds} member${plural}`
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
          setResponseErrors(["Error occured when adding members"]);
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

      // load suggestions if role allows
      if (showSuggestions) {
        if (val.length >= SUGGESTION_TRIGGER_LENGTH) {
          debouncedLoadSuggestions(val);
        } else {
          dispatch(clearSuggestions());
        }
      }
    },
    [dispatch, selectedMembers, showSuggestions]
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

      dispatch(clearSuggestions());
    },
    [dispatch, validateAdds]
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
      <ReactSelect
        value={selectedMembers}
        onChange={onUpdate}
        options={options}
        onInputChange={onInputChange}
        isMulti
        placeholder="Enter email address(es) or user handles"
        isCreatable
        noOptionsText="Type to search"
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
