import React from "react";

const Suggestions = ({ suggestions = [] }) => (
  <div>
    <h3>Did you mean?</h3>
    {suggestions.map((text, magicKey) => (
      <a key={magicKey} href={`?suggestion=${text}`}>
        {text}
      </a>
    ))}
  </div>
);

export default Suggestions;
