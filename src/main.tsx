import {createRoot} from 'react-dom/client';

const container = document.getElementById('catwalk');
const root = createRoot(container);

function renderApplication() {
  /* eslint-disable @typescript-eslint/no-var-requires */
  const Application = require('./components/Application').default;
  root.render(<Application />);
}

renderApplication();

if (module.hot) {
  module.hot.accept('./components/Application', () => {
    renderApplication();
  });
}
