import {useI18nMessages} from '../../hooks';

interface LoadingCartel {
  loadingPercentage: number;
}

function LoadingCartel({loadingPercentage}: LoadingCartel) {
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
            width: `${loadingPercentage}%`
          }}
        />
      </div>
      <h5 className="loading-message">{loadingMessage}</h5>
    </div>
  );
}

export default LoadingCartel;
