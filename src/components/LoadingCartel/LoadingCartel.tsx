import {useI18nMessages} from '../../hooks';

function LoadingCartel({loadingPct}) {
  const {loading_message} = useI18nMessages();
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
            width: `${loadingPct}%`
          }}
        />
      </div>
      <h5 className="loading_message">{loading_message}</h5>
    </div>
  );
}

export default LoadingCartel;
