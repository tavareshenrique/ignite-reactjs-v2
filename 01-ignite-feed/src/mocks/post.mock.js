import { faker } from '@faker-js/faker';
import { commentMock } from './comment.mock';

function getPublishedDate(name) {
  if (name.length % 2 === 0) {
    return faker.date.past();
  }

  return faker.date.recent();
}

export const postMock = ({ isFirst = false }) => {
  const author = isFirst
    ? {
        name: 'Kinkinha, A Pitica',
        avatar:
          'https://scontent.fsdu1-1.fna.fbcdn.net/v/t39.30808-6/273791462_993172601592251_3131606499545440989_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=8Qsr96YNlBkAX83Ua5L&_nc_ht=scontent.fsdu1-1.fna&oh=00_AT--_XtnTudpSb1mBDgZWRaEOJ_7LuHyskDJfK7XsxRrJw&oe=62AEAE05',
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
    comments: Array.from({ length: faker.random.numeric() }, () =>
      commentMock()
    ),
  };
};
