import React, { useCallback, useState } from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { toastr } from "react-redux-toastr";
import { loadSuggestions, clearSuggestions, addMembers } from "../../actions";
import Button from "components/Button";
import BaseModal from "components/BaseModal";
import ReactSelect from "components/ReactSelect";

const SUGGESTION_TRIGGER_LENGTH = 3;

function AddModal({ open, onClose, teamId, validateInvites }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
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

  const validateSelection = () => {
    if (validateInvites(selectedMembers)) {
      setError(
        new Error(
          "Project members can't be invited again. Please remove them from list"
        )
      );
    } else {
      setError(undefined);
    }
  };

  const handleClose = useCallback(() => {
    setSelectedMembers([]);
    setError(undefined);
    onClose();
  }, [onClose]);

  const submitInvites = useCallback(() => {
    const handles = [];
    const emails = [];
    selectedMembers.forEach((member) => {
      const val = member.label;
      if (member.isEmail) {
        emails.push(val);
      } else {
        handles.push(val);
      }
    });

    setLoading(true);

    dispatch(addMembers(teamId, handles, emails)).then((res) => {
      setLoading(false);
      if (!res.value.failed) {
        const numInvites = res.value.success.length;
        const plural = numInvites !== 1 ? "s" : "";
        handleClose();
        toastr.success(
          "Invites Added",
          `Successfully added ${numInvites} invite${plural}`
        );
      }
    })
    .catch(err => {
      setLoading(false);
      setError(err);
    })
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

      // load suggestions
      if (val.length >= SUGGESTION_TRIGGER_LENGTH) {
        debouncedLoadSuggestions(val);
      } else {
        dispatch(clearSuggestions());
      }
    },
    [dispatch]
  );

  const onUpdate = useCallback(
    (arr) => {
      const normalizedArr = arr.map((member) => ({
        ...member,
        isEmail: /(.+)@(.+){2,}\.(.+){2,}/.test(member.label),
      }));

      setSelectedMembers(normalizedArr);

      validateSelection();

      dispatch(clearSuggestions());
    },
    [dispatch]
  );

  const inviteButton = (
    <Button
      type="primary"
      size="medium"
      onClick={submitInvites}
      disabled={loading || selectedMembers.length < 1}
    >
      Add
    </Button>
  );

  return (
    <BaseModal
      open={open}
      onClose={handleClose}
      button={inviteButton}
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
      {error && error.message}
    </BaseModal>
  );
}

export default AddModal;
