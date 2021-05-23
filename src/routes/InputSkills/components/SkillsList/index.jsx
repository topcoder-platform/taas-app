import React, { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import Input from "components/Input";
import PageHeader from "components/PageHeader";
import "./styles.module.scss";
import SkillItem from "../SkillItem";
import { INPUT_DEBOUNCE_DELAY } from "constants/";

function SkillsList({ skills }) {
  const [filteredSkills, setFilteredSkills] = useState(skills);
  const [selectedSkills, setSelectedSkills] = useState([]);
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
  }, [debouncedFilter]);

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
      <div styleName="skill-container">
        {filteredSkills.map((skill) => (
          <SkillItem id={skill.id} name={skill.name} />
        ))}
      </div>
    </div>
  );
}

export default SkillsList;
