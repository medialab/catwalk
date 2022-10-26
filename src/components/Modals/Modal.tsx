import classNames from 'classnames';

interface ModalProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

function Modal({
  children,
  className,
  style,
  isOpen = true,
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
