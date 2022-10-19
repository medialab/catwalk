import {ComponentStory, ComponentMeta} from '@storybook/react';

import Layout from '../../components/Layout/Container';
import MainColumn from '../../components/Layout/MainColumn';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Layouts',
  component: Layout,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: {control: 'color'}
  }
} as ComponentMeta<typeof Layout>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Layout> = args => (
  <Layout {...args} style={{background: 'red'}} />
);

export const Landing = Template.bind({});
Landing.args = {
  mode: 'landing',
  children: (
    <MainColumn style={{background: 'green'}}>Layout du landing</MainColumn>
  )
};

export const Annotation = Template.bind({});
Annotation.args = {
  mode: 'annotation',
  children: (
    <>
      <div className="Railway">Railway</div>
      <MainColumn style={{background: 'green'}}>
        <header className="Header">
          <h1>Catwalk</h1>
        </header>
        <main className="MediaPreview">Media preview</main>
        <footer className="DownloadFooter">Download footer</footer>
      </MainColumn>
      <aside className="TagsColumn">Tags column</aside>
      <style>{`
      .Railway {
  background: purple;
}

.Header {
  background: lightblue;
}

.Header h1 {
  margin: 0;
}

.MediaPreview {
  background: blue;
}

.DownloadFooter {
  background: pink;
}

.TagsColumn {
  background: purple;
}
        `}</style>
    </>
  )
};
