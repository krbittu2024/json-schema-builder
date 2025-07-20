import React, { useState } from 'react';
import SchemaBuilder from './components/SchemaBuilder';
import './App.css';

const App = () => {
  const [schema, setSchema] = useState([]);

  const generateJson = (fields) => {
    const result = {};
    fields.forEach(({ key, type, required, children }) => {
      if (!key) return;
      if (type === 'nested') {
        result[key] = generateJson(children || []);
      } else {
        result[key] = required ? type.toUpperCase() : type;
      }
    });
    return result;
  };

  const handleSubmit = () => {
    const output = generateJson(schema);
    console.log("Submitted Schema: ", output);
    alert("Check console for submitted JSON!");
  };

  return (
    <div className="app">
      <div className="form">
        <SchemaBuilder fields={schema} setFields={setSchema} />
        <button className="submit-btn" onClick={handleSubmit}>Submit</button>
      </div>
      <div className="output">
        <h3>JSON Output</h3>
        <pre>{JSON.stringify(generateJson(schema), null, 2)}</pre>
      </div>
    </div>
  );
};

export default App;
