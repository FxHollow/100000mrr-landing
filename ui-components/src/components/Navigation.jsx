import './Navigation.css';

/**
 * Navigation Component
 *
 * @param {Array} items - Navigation items [{label, href, active, icon}]
 * @param {string} variant - 'horizontal' | 'vertical'
 * @param {boolean} responsive - Enable mobile responsive menu
 * @param {React.ReactNode} logo - Logo element
 * @param {React.ReactNode} rightContent - Right side content (e.g., user menu)
 */
export default function Navigation({
  items = [],
  variant = 'horizontal',
  responsive = true,
  logo,
  rightContent,
  className = '',
  ...props
}) {
  const baseClasses = 'nav';
  const variantClasses = `nav-${variant}`;
  const responsiveClass = responsive ? 'nav-responsive' : '';

  const classNames = `${baseClasses} ${variantClasses} ${responsiveClass} ${className}`.trim();

  return (
    <nav className={classNames} {...props}>
      <div className="nav-container">
        {logo && <div className="nav-logo">{logo}</div>}

        <ul className="nav-items">
          {items.map((item, index) => (
            <li key={index} className={`nav-item ${item.active ? 'nav-item-active' : ''}`}>
              <a
                href={item.href}
                className="nav-link"
                aria-current={item.active ? 'page' : undefined}
              >
                {item.icon && <span className="nav-icon">{item.icon}</span>}
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {rightContent && <div className="nav-right">{rightContent}</div>}
      </div>
    </nav>
  );
}
