export default function MainColumn({
  children,
  style = {},
  className = ''
}) {
  return (
    <div className={`MainColumn ${className}`} style={style}>
      {children}
    </div>
  );
}
