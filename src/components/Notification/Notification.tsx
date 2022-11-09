import type {NotificationType} from '../../types';

interface NotificationProps {
  children: React.ReactNode;
  isType?: NotificationType;
}

function Notification({children, isType = 'error'}: NotificationProps) {
  return <div className={`Notification is-type-${isType}`}>{children}</div>;
}

export default Notification;
