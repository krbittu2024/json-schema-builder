import React from 'react';
import './SchemaBuilder.css';

const FIELD_TYPES = ['string', 'number', 'nested', 'objectId', 'float', 'boolean'];

function SchemaBuilder({ fields, setFields }) {
  const addField = () => {
    setFields([...fields, { id: Date.now(), key: '', type: '', required: false, children: [] }]);
  };

  const deleteField = (id) => {
    setFields(fields.filter((f) => f.id !== id));
  };

  const updateField = (id, key, value) => {
    setFields(fields.map(f => (f.id === id ? { ...f, [key]: value } : f)));
  };

  const updateNested = (id, nestedChildren) => {
    setFields(fields.map(f => (f.id === id ? { ...f, children: nestedChildren } : f)));
  };

  return (
    <div className="schema-builder">
      {fields.map((field) => (
        <div className="field-row" key={field.id}>
          <input
            type="text"
            placeholder="Field name"
            value={field.key}
            onChange={(e) => updateField(field.id, 'key', e.target.value)}
          />
          <select
            value={field.type}
            onChange={(e) => updateField(field.id, 'type', e.target.value)}
          >
            <option value="">Field Type</option>
            {FIELD_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={field.required}
              onChange={() => updateField(field.id, 'required', !field.required)}
            />
            <span className="slider" />
          </label>
          <button className="delete-btn" onClick={() => deleteField(field.id)}>×</button>

          {field.type === 'nested' && (
            <div className="nested">
              <SchemaBuilder
                fields={field.children || []}
                setFields={(nestedFields) => updateNested(field.id, nestedFields)}
              />
            </div>
          )}
        </div>
      ))}
      <button className="add-btn" onClick={addField}>+ Add Item</button>
    </div>
  );
}

export default SchemaBuilder;
