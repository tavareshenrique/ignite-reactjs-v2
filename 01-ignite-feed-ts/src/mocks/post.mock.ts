import { faker } from '@faker-js/faker';
import { commentMock, CommentType } from './comment.mock';

type ContentType =  'paragraph' | 'link';

type Content = {
  id: string;
  type: ContentType;
  content: string;
}

export type PostType = {
  id: number;
  title: string;
  content: Content[];
  author: {
    name: string;
    avatarUrl: string;
    role: string;
  },
  publishAt: string;
  comments: CommentType[];
}

function getPublishedDate(name: string) {
  if (name.length % 2 === 0) {
    return faker.date.past();
  }

  return faker.date.recent();
}

export const postMock = ({ isFirst = false }) => {
  const author = isFirst
    ? {
        name: 'Kinkinha, A Pitica',
        avatar: faker.image.avatar(),
        role: 'Teacher | Economista',
      }
    : {
        name: faker.name.findName(),
        avatar: faker.image.avatar(),
        role: faker.name.jobTitle(),
      };

  return {
    id: faker.datatype.uuid(),
    author: {
      avatarUrl: author.avatar,
      name: author.name,
      role: author.role,
    },
    publishAt: getPublishedDate(author.name),
    content: [
      {
        id: faker.datatype.uuid(),
        type: 'paragraph',
        content: 'Fala galera 👋',
      },
      {
        id: faker.datatype.uuid(),
        type: 'paragraph',
        content:
          'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀',
      },
      {
        id: faker.datatype.uuid(),
        type: 'link',
        content: '👉 jane.design/doctorcare',
      },
    ],
    comments: Array.from({ length: Number(faker.random.numeric()) }, () =>
      commentMock()
    ),
  };
};
