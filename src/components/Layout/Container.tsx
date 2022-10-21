import classNames from 'classnames';

type LayoutMode = 'landing' | 'annotation';

interface ContainerProps {
  children: React.ReactNode;
  style: React.CSSProperties;
  className: string;
  mode: LayoutMode;
}

export default function Container({
  children,
  style = {},
  className,
  mode = 'landing'
}: ContainerProps) {
  return (
    <div
      className={classNames('Container', `is-mode-${mode}`, className)}
      style={style}>
      {children}
    </div>
  );
}
