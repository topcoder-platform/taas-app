/**
 * Skills List
 * Lists all skills available to apply to a job
 * and search for. Allows selecting skills and filtering
 * by name.
 */
import React, { useCallback, useState } from "react";
import PT from "prop-types";
import SkillItem from "../SkillItem";
import ItemList from "../../../../components/ItemList";
import { formatPlural } from "utils/format";

function SkillsList({ skills, selectedSkills, toggleSkill }) {
  const [filteredSkills, setFilteredSkills] = useState(skills);

  const filterSkills = useCallback(
    (filterText) => {
      if (filterText === "") {
        setFilteredSkills(skills);
      } else {
        const filtered = skills.filter((skill) =>
          skill.name.toLowerCase().includes(filterText)
        );
        setFilteredSkills(filtered);
      }
    },
    [skills]
  );

  return (
    <ItemList
      title="Input Skills"
      filterPlaceholder="Find skills or technologies.."
      filterItems={filterSkills}
      subtitle={
        selectedSkills.length
          ? `${formatPlural(selectedSkills.length, "skill")} selected`
          : null
      }
    >
      {filteredSkills.map(({ id, name }) => (
        <SkillItem
          key={id}
          id={id}
          name={name}
          onClick={toggleSkill}
          isSelected={selectedSkills.includes(id)}
        />
      ))}
    </ItemList>
  );
}

SkillsList.propTypes = {
  skills: PT.array,
  selectedSkills: PT.array,
  toggleSkill: PT.func,
};

export default SkillsList;
