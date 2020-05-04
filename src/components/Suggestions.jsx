import React from "react";
import { Link } from "react-router-dom";

const Suggestions = ({ suggestions = [] }) => (
  <div>
    <h3>Did you mean?</h3>
    <ul>
      {suggestions.map((text, magicKey) => (
        <li key={magicKey}>
          <Link to={`/${text}`}>{text}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Suggestions;
