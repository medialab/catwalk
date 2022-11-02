import {useI18nMessages} from '../../hooks';

interface LoadingCartel {
  loadingPercentage: number;
  message?: string;
}

function LoadingCartel({loadingPercentage, message}: LoadingCartel) {
  const {loadingMessage} = useI18nMessages();

  return (
    <div className="LoadingCartel">
      <div className="animation-container">
        <span>↷</span>
        <span>↷</span>
      </div>
      <div className="bar-container">
        <div
          className="bar-bar"
          style={{
            width: `${Math.ceil(loadingPercentage * 100)}%`
          }}
        />
      </div>
      <h5 className="loading-message">
        {loadingMessage}
        {!!message && <span> ({message})</span>}
      </h5>
    </div>
  );
}

export default LoadingCartel;
