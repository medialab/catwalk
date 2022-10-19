import {LangContext} from '../contexts';
import {useI18nMessages} from '../hooks';

import './Application.scss';

function TagLine() {
  const messages = useI18nMessages();

  return <div>{messages.tagline}</div>;
}

export default function Application() {
  return (
    <LangContext.Provider value="en">
      <div>Catwalk version 2</div>
      <TagLine />
    </LangContext.Provider>
  );
}
