interface MainRowProps {
  children: React.ReactNode;
}

function MainRow({children}: MainRowProps) {
  return <div className="MainRow">{children}</div>;
}

export default MainRow;
