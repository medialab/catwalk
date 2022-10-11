import {createRoot} from 'react-dom/client';

const container = document.getElementById('catwalk');
const root = createRoot(container);

function renderApplication() {
  const Application = require('./components/Application').default;
  root.render(<Application />);
}

renderApplication();

if (module.hot) {
  module.hot.accept('./components/Application', () => {
    renderApplication();
  });
}
