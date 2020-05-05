import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Suggestions = ({ suggestions = [] }) => (
  <div>
    <h3>Did you mean?</h3>
    <ul>
      {suggestions.map((text) => (
        <li key={text}>
          <Link to={`/${text}`}>{text}</Link>
        </li>
      ))}
    </ul>
  </div>
);

Suggestions.propTypes = {
  /** List of possible address as an array of strings */
  suggestions: PropTypes.array,
};

export default Suggestions;
