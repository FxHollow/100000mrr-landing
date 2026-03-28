import './Card.css';

/**
 * Card Component
 *
 * @param {React.ReactNode} children - Card content
 * @param {React.ReactNode} header - Optional header content
 * @param {React.ReactNode} footer - Optional footer content
 * @param {boolean} hoverable - Whether card has hover effect
 * @param {string} className - Additional CSS classes
 */
export default function Card({
  children,
  header,
  footer,
  hoverable = false,
  className = '',
  ...props
}) {
  const hoverClass = hoverable ? 'card-hoverable' : '';
  const classNames = `card ${hoverClass} ${className}`.trim();

  return (
    <div className={classNames} {...props}>
      {header && <div className="card-header">{header}</div>}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
}
