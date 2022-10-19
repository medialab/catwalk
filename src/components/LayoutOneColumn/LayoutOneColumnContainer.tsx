

export default function LayoutOneColumnContainer({
  children, 
  style = {},
  className = ''
}) {
  return (
    <div className={`LayoutOneColumnContainer ${className}`} style={style}>
      {children}
    </div>
  )
}