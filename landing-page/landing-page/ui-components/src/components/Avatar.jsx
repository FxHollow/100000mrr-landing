import './Avatar.css';

/**
 * Avatar Component
 *
 * @param {string} src - Image URL
 * @param {string} alt - Alt text for image
 * @param {string} name - Name for fallback initials
 * @param {string} size - 'sm' | 'md' | 'lg'
 * @param {string} className - Additional CSS classes
 */
export default function Avatar({
  src,
  alt = '',
  name,
  size = 'md',
  className = '',
  ...props
}) {
  const sizeClass = `avatar-${size}`;
  const classNames = `avatar ${sizeClass} ${className}`.trim();

  // Generate initials from name
  const getInitials = (fullName) => {
    if (!fullName) return '?';
    const names = fullName.trim().split(/\s+/);
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  const initials = getInitials(name);

  return (
    <div className={classNames} {...props}>
      {src ? (
        <img src={src} alt={alt || name} className="avatar-image" />
      ) : (
        <span className="avatar-fallback">{initials}</span>
      )}
    </div>
  );
}
