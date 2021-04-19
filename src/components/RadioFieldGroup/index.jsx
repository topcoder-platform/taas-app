/**
 * RadioFieldGroup
 *
 * Component that takes a configuration object
 * and returns a group of react-final-form radio fields
 */

import React from "react";
import PT from "prop-types";
import Radio from "components/Radio";
import { Field } from "react-final-form";

function RadioFieldGroup({ name, isHorizontal, radios }) {
  return (
    <div>
      {radios.map((radio) => (
        <Field name={name} type="radio" value={radio.value}>
          {({ input }) => (
            <Radio
              label={radio.label}
              type="radio"
              name={input.name}
              value={input.value}
              horizontal={isHorizontal}
              onChange={input.onChange}
              onBlur={input.onBlur}
              onFocus={input.onFocus}
              checked={input.checked}
            />
          )}
        </Field>
      ))}
    </div>
  );
}

RadioFieldGroup.propTypes = {
  name: PT.string.isRequired,
  isHorizontal: PT.bool,
  radios: PT.arrayOf(
    PT.shape({
      label: PT.string.isRequired,
      value: PT.any.isRequired,
    })
  ),
};

export default RadioFieldGroup;
