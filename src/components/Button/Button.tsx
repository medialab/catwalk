import classNames from 'classnames';

interface ButtonProps extends React.ComponentProps<'button'> {
  isFullWidth?: boolean;
  isActive?: boolean;
}

function Button({
  children,
  className,
  isFullWidth = false,
  isActive = false,
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
