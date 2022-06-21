import { faker } from '@faker-js/faker';

export type CommentType = {
  id: string;
  author: {
    avatarUrl: string;
    name: string;
  },
  publishAt: Date;
  content: {
    id: string;
    type: string;
    content: string;
  }[]
}

export const commentMock = (comment = ''): CommentType => {
  if (comment) {
    return {
      id: faker.datatype.uuid(),
      author: {
        avatarUrl: 'https://avatars.githubusercontent.com/u/27022914?v=4',
        name: 'Henrique Tavares',
      },
      publishAt: new Date(),
      content: [
        { id: faker.datatype.uuid(), type: 'paragraph', content: comment },
      ],
    };
  }

  const name = faker.name.findName();

  return {
    id: faker.datatype.uuid(),
    author: {
      avatarUrl: faker.image.avatar(),
      name,
    },
    publishAt: faker.date.recent(),
    content: [
      {
        id: faker.datatype.uuid(),
        type: 'paragraph',
        content: faker.lorem.paragraph(),
      },
    ],
  };
};
