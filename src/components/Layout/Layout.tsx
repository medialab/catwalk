import classNames from 'classnames';

import {LayoutMode} from '../../types';

interface ContainerProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  mode: LayoutMode;
}

export default function Layout({
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
