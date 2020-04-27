import "accessible-autocomplete/dist/accessible-autocomplete.min.css";

import { FormatAddress } from "../common/Formatters";
import PropTypes from "prop-types";
import React from "react";
import UkAutocomplete from "accessible-autocomplete/react";
import { useDebouncedCallback } from "use-debounce";

const Autocomplete = ({ id, suggest, label, ...rest }) => {
  const [debouncedCallback] = useDebouncedCallback(suggest, 300);

  const handleSource = (query, populateResults) => {
    debouncedCallback(query, populateResults);
  };

  return (
    <div className="dg_form-field">
      {label && (
        <label className="dg_label" htmlFor={id}>
          {label}
        </label>
      )}
      <UkAutocomplete
        id={id}
        className="dg_form-field_input--text"
        source={handleSource}
        showNoOptionsFound={false}
        templates={{
          inputValue: FormatAddress,
          suggestion: FormatAddress,
        }}
        {...rest}
      />
    </div>
  );
};

Autocomplete.prototypes = {
  /** Unique id to relate the label with the autocomplete input */
  id: PropTypes.string.isRequired,
  /** Label to describe the input */
  label: PropTypes.string,
  /** Suggest function populates the autocomplete values */
  suggest: PropTypes.func.isRequired,
};

export default Autocomplete;
