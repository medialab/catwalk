import classNames from 'classnames';

type ModalProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
};
function Modal({children, className = '', style, isOpen, onClose}: ModalProps) {
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
