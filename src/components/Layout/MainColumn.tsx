import classNames from 'classnames';

interface MainColumnProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export default function MainColumn({
  children,
  style = {},
  className
}: MainColumnProps) {
  return (
    <div className={classNames('MainColumn', className)} style={style}>
      {children}
    </div>
  );
}
