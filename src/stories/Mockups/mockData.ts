import type {AnnotationConfig, AnnotationStats, CSVRows} from '../../types';

export const mockAnnotationConfig: AnnotationConfig = {
  selectedColumn: 'not-important',
  previewType: 'twitter-tweet',
  options: {
    sortOrder: 'table',
    navKeyBindings: {
      prev: 'arrow up',
      next: 'arrow down'
    }
  },
  schema: [
    {
      id: '0',
      name: 'Status',
      color: 'red',
      modalities: [
        {id: '0', name: 'In', key: 'A'},
        {id: '1', name: 'Out', key: 'Z'},
        {id: '2', name: 'Undecided', key: 'E'}
      ]
    },
    {
      id: '1',
      name: 'Language',
      color: 'blue',
      modalities: [
        {id: '0', name: 'français', key: 'Q'},
        {id: '1', name: 'anglais', key: 'S'}
      ]
    }
  ]
};

export const mockAnnotationStats: AnnotationStats = {
  counter: {
    Status: {
      count: 114,
      modalities: {
        In: {
          count: 3
        },
        Out: {
          count: 56
        },
        Undecided: {
          count: 55
        }
      }
    },
    Language: {
      count: 65,
      modalities: {
        français: {count: 53},
        anglais: {count: 12}
      }
    }
  }
};

export const mockAnnotationTotal = 190;

export const generateMockAnnotatedTweets = (number = 20) => {
  const output: CSVRows = [];
  for (let i = 0; i < number; i++) {
    const object = mockAnnotationConfig.schema.reduce(
      (cur, category) => {
        let value = '';
        const isAnnotated = Math.random() > 0.7;
        if (isAnnotated) {
          const modalities = category.modalities.map(m => m.name);
          const randomModalityIndex = Math.round(
            Math.random() * modalities.length
          );
          value = modalities[randomModalityIndex];
        }
        return {
          ...cur,
          // @todo question should the user-input categories be namespaced ?
          [`${category.name}`]: value
        };
      },
      {
        url: 'https://twitter.com/robindemourat/status/1580220856965693441'
      }
    );

    output.push(object);
  }
  return output;
};
