import type {RailwayKeyBinding} from '../../types';
import Button from '../Button';
import Modal from './Modal';
import {useI18nMessages} from '../../hooks';

interface KeyEditModalCommonProps {
  onClose?: () => void;
}

interface KeyEditModalProps extends KeyEditModalCommonProps {
  title: JSX.Element;
}

export default function KeyEditModal({onClose, title}: KeyEditModalProps) {
  const {modalKeyAssignMessage, modalCancel} = useI18nMessages();

  return (
    <Modal onClose={onClose}>
      <h3>{title}</h3>
      <p>{modalKeyAssignMessage}</p>
      <Button onClick={onClose}>{modalCancel}</Button>
    </Modal>
  );
}

interface RailwayNavKeyEditModalProps extends KeyEditModalCommonProps {
  binding: RailwayKeyBinding;
}

export function RailwayNavKeyEditModal({
  onClose,
  binding
}: RailwayNavKeyEditModalProps) {
  const {
    railwayKeyassignModalTitle,
    railwayKeyassignModalNext,
    railwayKeyassignModalPrev
  } = useI18nMessages();

  const title = (
    <>
      {railwayKeyassignModalTitle}
      <code>
        {binding === 'next'
          ? railwayKeyassignModalNext
          : railwayKeyassignModalPrev}
      </code>
    </>
  );

  return <KeyEditModal onClose={onClose} title={title} />;
}
