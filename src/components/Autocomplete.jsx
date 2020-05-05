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
      <div style={{ position: "relative" }}>
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
        <button
          type="submit"
          style={{
            position: "absolute",
            right: "7px",
            top: "7px",
            lineHeight: "18px",
            padding: "0 2.5px",
          }}
        >
          <i className="fas fa-search" style={{ fontSize: "18px" }}></i>
        </button>
      </div>
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
