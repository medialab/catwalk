export const mockAnnotationModel = {
  options: {
    sortOrder: 'table',
    navKeyBindings: {
      prev: 'arrow up',
      next: 'arrow down'
    }
  },
  schema: [
    {
      name: 'Status',
      color: 'red',
      modalities: [
        {
          name: 'In',
          key: 'A'
        },
        {
          name: 'Out',
          key: 'Z'
        },
        {
          name: 'Undecided',
          key: 'E'
        }
      ]
    },
    {
      name: 'Language',
      color: 'blue',
      modalities: [
        {
          name: 'français',
          key: 'Q'
        },
        {
          name: 'anglais',
          key: 'S'
        }
      ]
    }
  ]
};

export const mockAnnotationStats = [
  {
    name: 'Status',
    completedPortion: 0.6,
    modalities: [
      {
        name: 'In',
        count: 3
      },
      {
        name: 'Out',
        count: 56
      },
      {
        name: 'Undecided',
        count: 55
      }
    ]
  },
  {
    name: 'Language',
    completedPortion: 0.34,
    modalities: [
      {
        name: 'français',
        count: 53
      },
      {
        name: 'anglais',
        count: 12
      }
    ]
  }
];

export const generateMockAnnotatedTweets = (number = 20) => {
  const output = [];
  for (let i = 0; i < number; i++) {
    const object = mockAnnotationModel.schema.reduce(
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
