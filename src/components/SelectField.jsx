import React, { useId } from "react";

const SelectField = React.forwardRef(function SelectField(
  { label, options = [], className = "", ...props },
  ref
) {
  const id = useId();

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="inline-block mb-1 pl-1">
          {label}
        </label>
      )}
      <select
        id={id}
        ref={ref}
        className="w-full px-3 py-2 rounded-lg bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...props}
      >
        <option value="">Select status</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt.charAt(0).toUpperCase() + opt.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
});

export default SelectField;
