/**
 * useLoadSkills hook
 */
import { useEffect, useState } from "react";
import { flatten, partition } from "lodash";
import { useData } from "hooks/useData";
import { getSkills } from "services/skills";
import { getRoles } from "services/roles";

/**
 * Hook which loads all skills and roles, then partitions skills based
 * on whether any role requires the given skill.
 *
 * @returns [skills, error] tuple with `skills` array and `error` object
 */
export const useLoadSkills = () => {
  const [skills, skillsError] = useData(getSkills);
  const [roles, rolesError] = useData(getRoles);
  const [partedSkills, setPartedSkills] = useState();

  useEffect(() => {
    if (skills && roles) {
      const requiredSkills = new Set();
      roles.forEach((role) => {
        role.listOfSkills.forEach((skill) => {
          requiredSkills.add(skill);
        });
      });
      setPartedSkills(() =>
        flatten(partition(skills, (skill) => requiredSkills.has(skill.name)))
      );
    }
  }, [skills, roles]);

  return [partedSkills, skillsError || rolesError];
};
