import "accessible-autocomplete/dist/accessible-autocomplete.min.css";

import PropTypes from "prop-types";
import React from "react";
import UkAutocomplete from "accessible-autocomplete/react";

const Autocomplete = ({ id, suggest, label, ...rest }) => {
  return (
    <div className="dg_form-field" {...rest}>
      {label && (
        <label className="dg_label" htmlFor={id}>
          {label}
        </label>
      )}
      <UkAutocomplete
        id={id}
        className="dg_form-field_input--text"
        source={suggest}
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
  suggest: PropTypes.func.isRequired
};

export default Autocomplete;
