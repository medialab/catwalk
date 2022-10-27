import '!style-loader!css-loader!sass-loader!../src/styles/entrypoint.scss';

export const parameters = {
  actions: {argTypesRegex: '^on[A-Z].*'},
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  options: {
    storySort: {
      method: 'alphabetical',
      order: ['Components', 'Hooks', 'Mockups', 'Previews', '*']
    }
  }
};
