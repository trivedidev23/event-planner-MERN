import React from "react";

const TextInput = ({
  label,
  type,
  value,
  onChange,
  onBlur,
  className,
  name,
  id,
  err,
  errorMessage,
}) => {
  return (
    <>
      <label className="form-label">{label}</label>
      <input
        type={type || "text"}
        name={name}
        value={value}
        className={`form-control ${className}`}
        id={id}
        onChange={onChange}
        onBlur={onBlur}
      />
      {err && <p className="text-danger small">{errorMessage}</p>}
    </>
  );
};

export default TextInput;
