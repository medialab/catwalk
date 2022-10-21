interface InfoPinProps {
  message: string;
}

function InfoPin({message}: InfoPinProps) {
  return (
    <span className="InfoPin" aria-label={message}>
      <span>
        <span>?</span>
      </span>
    </span>
  );
}

export default InfoPin;
