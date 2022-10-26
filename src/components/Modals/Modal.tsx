import classNames from 'classnames';

export interface ModalPropsBase {
  isOpen?: boolean;
  onClose?: () => void;
}

interface ModalProps extends ModalPropsBase {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

function Modal({
  children,
  className,
  style,
  isOpen = false,
  onClose
}: ModalProps) {
  return (
    <div
      className={classNames('Modal', className, {
        'is-open': isOpen
      })}
      style={style}>
      <div className="modal-bg" onClick={onClose} />
      <div className="modal-content">{children}</div>
    </div>
  );
}

export default Modal;
