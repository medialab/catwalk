import classNames from 'classnames';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  isFullWidth?: boolean;
}

function Button({children, className, isFullWidth, ...props}: ButtonProps) {
  return (
    <button
      className={classNames('Button', className, {
        'is-full-width': isFullWidth
      })}
      {...props}>
      {children}
    </button>
  );
}

export default Button;
