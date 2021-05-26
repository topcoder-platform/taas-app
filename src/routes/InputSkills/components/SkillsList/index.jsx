/**
 * Skills List
 * Lists all skills available to apply to a job
 * and search for. Allows selecting skills and filtering
 * by name.
 */
import React, { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import PT from "prop-types";
import Input from "components/Input";
import PageHeader from "components/PageHeader";
import "./styles.module.scss";
import SkillItem from "../SkillItem";
import { INPUT_DEBOUNCE_DELAY } from "constants/";

function SkillsList({ skills, selectedSkills, toggleSkill }) {
  const [filteredSkills, setFilteredSkills] = useState(skills);
  const [filter, setFilter] = useState("");
  const [debouncedFilter, setDebouncedFilter] = useState("");

  const onFilterChange = (e) => {
    setFilter(e.target.value);
  };

  useDebounce(
    () => {
      setDebouncedFilter(filter);
    },
    INPUT_DEBOUNCE_DELAY,
    [filter]
  );

  useEffect(() => {
    if (debouncedFilter.length > 0) {
      const filterText = debouncedFilter.toLowerCase();
      setFilteredSkills(
        skills.filter((skill) => skill.name.toLowerCase().includes(filterText))
      );
    } else {
      setFilteredSkills(skills);
    }
  }, [debouncedFilter, skills]);

  return (
    <div styleName="skills-list">
      <PageHeader
        title="Input Skills"
        backTo="/taas/myteams/createnewteam"
        aside={
          <Input
            styleName="filter-input"
            placeholder="Find skills or technologies.."
            onChange={onFilterChange}
          />
        }
      />
      {selectedSkills.length > 0 && (
        <p styleName="skill-count">{selectedSkills.length} skills selected</p>
      )}
      <div styleName="skill-container">
        {filteredSkills.map(({ id, name }) => (
          <SkillItem
            key={id}
            id={id}
            name={name}
            onClick={toggleSkill}
            isSelected={selectedSkills.includes(id)}
          />
        ))}
      </div>
    </div>
  );
}

SkillsList.propTypes = {
  skills: PT.array,
  selectedSkills: PT.array,
  toggleSkill: PT.func,
};

export default SkillsList;
