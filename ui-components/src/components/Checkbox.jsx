import './Checkbox.css';

/**
 * Checkbox Component
 *
 * @param {string} id - Unique identifier for the checkbox
 * @param {string} label - Label text for the checkbox
 * @param {boolean} checked - Whether the checkbox is checked
 * @param {boolean} disabled - Whether the checkbox is disabled
 * @param {boolean} indeterminate - Whether the checkbox is in indeterminate state
 * @param {function} onChange - Change handler
 * @param {string} className - Additional CSS class names
 */
export default function Checkbox({
  id,
  label,
  checked = false,
  disabled = false,
  indeterminate = false,
  onChange,
  className = '',
  ...props
}) {
  const classNames = `checkbox-container ${className}`.trim();
  const inputClassNames = `checkbox-input ${disabled ? 'checkbox-disabled' : ''}`.trim();

  return (
    <label className={classNames}>
      <input
        type="checkbox"
        id={id}
        className={inputClassNames}
        checked={checked}
        disabled={disabled}
        ref={(el) => {
          if (el) el.indeterminate = indeterminate;
        }}
        onChange={onChange}
        {...props}
      />
      <span className="checkbox-label">{label}</span>
    </label>
  );
}
