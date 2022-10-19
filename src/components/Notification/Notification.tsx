

function Notification ({
  children,
  isType = 'error'
}) {
  return (
    <div className={`Notification is-type-${isType}`}>
      {children}
    </div>
  )
}

export default Notification;