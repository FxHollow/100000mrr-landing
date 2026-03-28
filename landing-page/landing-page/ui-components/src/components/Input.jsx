import './Input.css';

/**
 * Input Component
 *
 * @param {string} type - 'text' | 'email' | 'password' | 'number' | 'textarea'
 * @param {string} value - Input value
 * @param {function} onChange - Change handler
 * @param {string} placeholder - Placeholder text
 * @param {string} label - Optional label
 * @param {string} error - Optional error message
 * @param {boolean} disabled - Whether input is disabled
 * @param {boolean} fullWidth - Whether input takes full width
 */
export default function Input({
  type = 'text',
  value,
  onChange,
  placeholder,
  label,
  error,
  disabled = false,
  fullWidth = false,
  className = '',
  id,
  ...props
}) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const widthClass = fullWidth ? 'input-full' : '';
  const errorClass = error ? 'input-error' : '';
  const disabledClass = disabled ? 'input-disabled' : '';

  const classNames = `input ${widthClass} ${errorClass} ${disabledClass} ${className}`.trim();

  return (
    <div className="input-wrapper">
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
        </label>
      )}
      {type === 'textarea' ? (
        <textarea
          id={inputId}
          className={classNames}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          rows={4}
          {...props}
        />
      ) : (
        <input
          type={type}
          id={inputId}
          className={classNames}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          {...props}
        />
      )}
      {error && <span className="input-error-message">{error}</span>}
    </div>
  );
}
