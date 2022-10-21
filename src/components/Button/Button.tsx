import classNames from 'classnames';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  isFullWidth?: boolean;
  isActive?: boolean;
  onClick?: () => any;
}

function Button({
  children,
  className,
  isFullWidth,
  isActive,
  onClick,
  ...props
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={classNames('Button', className, {
        'is-full-width': isFullWidth,
        'is-active': isActive
      })}
      {...props}>
      {children}
    </button>
  );
}

export default Button;
