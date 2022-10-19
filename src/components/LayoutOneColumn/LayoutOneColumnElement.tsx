

export default function LayoutOneColumnElement({
  children, 
  style = {}, 
  className = '',
}) {
  return (
    <div className={`LayoutOneColumnElement ${className}`} style={style}>
      {children}
    </div>
  )
}