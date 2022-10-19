

type LayoutModes = 'landing'|'annotation';

interface ContainerProps {
  children: JSX.Element[] | JSX.Element;
  style: object;
  className: string;
  mode: LayoutModes;
}

export default function Container({
  children,
  style = {},
  className = '',
  mode = 'landing'
}: ContainerProps) {
  return (
    <div className={`Container is-mode-${mode} ${className}`} style={style}>
      {children}
    </div>
  );
}
