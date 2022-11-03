import classNames from 'classnames';

interface ModalProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  isOpen?: boolean;
  canBeEscaped?: boolean;
  onClose?: () => void;
}

function Modal({
  children,
  className,
  style,
  isOpen = true,
  canBeEscaped = true,
  onClose
}: ModalProps) {
  return (
    <div
      className={classNames('Modal', className, {
        'is-open': isOpen
      })}
      style={style}>
      <div className="modal-bg" onClick={canBeEscaped ? onClose : undefined} />
      <div className="modal-content">{children}</div>
    </div>
  );
}

export default Modal;
