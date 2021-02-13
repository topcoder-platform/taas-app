import React, { useCallback, useState } from "react";
import _ from 'lodash';
import { useDispatch, useSelector } from "react-redux";
import { loadSuggestions, clearSuggestions } from "../../actions";
import Button from "components/Button";
import BaseModal from "components/BaseModal";
import ReactSelect from "components/ReactSelect";

const SUGGESTION_TRIGGER_LENGTH = 3;

function AddModal({ open, onClose }) {

  const [selectedMembers, setSelectedMembers] = useState([]);
  const options = useSelector(state => state.teamMembers.suggestions.map(sugg => ({ label: sugg.handle, value: sugg.handle })));
  const dispatch = useDispatch();

  const debouncedLoadSuggestions = _.debounce(arg => {dispatch(loadSuggestions(arg))}, 500, {leading: true});

  const handleClose = useCallback(() => {
    setSelectedMembers([]);
    onClose()
  },[onClose])

  const onInputChange = useCallback((val) => {
    const spaceIndex = val.indexOf(" ");
    const semiColonIndex = val.indexOf(";");

    // use space or semi-colon to add a member
    if (spaceIndex === 0 || semiColonIndex === 0) return "";
    if (spaceIndex >= 1 || semiColonIndex >= 1) {
      val = val.slice(0, -1);
      onUpdate([...selectedMembers, {label: val, value: val}])
      return "";
    }

    // load suggestions
    if (val.length >= SUGGESTION_TRIGGER_LENGTH) {
      debouncedLoadSuggestions(val);
    } else {
      dispatch(clearSuggestions());
    }
  }, [dispatch])

  const onUpdate = useCallback((arr) => {
    const normalizedArr = arr.map(member => ({
      ...member,
      isEmail: (/(.+)@(.+){2,}\.(.+){2,}/).test(member.label)
    }));

    setSelectedMembers(normalizedArr);
    dispatch(clearSuggestions());
  }, [dispatch])

  const inviteButton = (
    <Button
      type="primary"
      size="medium"
      onClick={() => console.log('yay')}
    >
      Invite
    </Button>
  );

  return (
    <BaseModal
      open={open}
      onClose={handleClose}
      button={inviteButton}
      title="Invite more people"
    >
      <ReactSelect
        value={selectedMembers}
        onChange={onUpdate}
        options={options}
        onInputChange={onInputChange}
        isMulti
        placeholder="Enter one or more user handles"
      />
    </BaseModal>
  );
}

export default AddModal;
