import './Badge.css';

/**
 * Badge Component
 *
 * @param {string} variant - 'default' | 'primary' | 'success' | 'warning' | 'danger'
 * @param {string} size - 'sm' | 'md'
 * @param {React.ReactNode} children - Badge content
 * @param {string} className - Additional CSS classes
 */
export default function Badge({
  variant = 'default',
  size = 'md',
  children,
  className = '',
  ...props
}) {
  const classNames = `badge badge-${variant} badge-${size} ${className}`.trim();

  return (
    <span className={classNames} {...props}>
      {children}
    </span>
  );
}
