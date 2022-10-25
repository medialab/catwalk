import formatInt from 'comma-number';

import {useI18nMessages} from '../../hooks';

interface LoadingCartel {
  loadingPercentage: number;
  lines?: number;
}

function LoadingCartel({loadingPercentage, lines}: LoadingCartel) {
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
        {!!lines && <span> (parsed {formatInt(lines)} lines)</span>}
      </h5>
    </div>
  );
}

export default LoadingCartel;
