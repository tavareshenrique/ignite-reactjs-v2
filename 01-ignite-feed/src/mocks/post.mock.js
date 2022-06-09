import { faker } from '@faker-js/faker';

function getPublishedDate(name) {
  if (name.length % 2 === 0) {
    return faker.date.past();
  }

  return faker.date.recent();
}

export const PostMock = () => {
  const name =  faker.name.findName();

  return  {
    id: faker.datatype.uuid(),
    author: {
      avatarUrl: faker.image.avatar(),
      name,
      role: faker.name.jobTitle(),
    },
    publishAt: getPublishedDate(name),
    content: [
      { id: faker.datatype.uuid(), type: 'paragraph', content: 'Fala galera 👋' },
      { id: faker.datatype.uuid(), type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀' },
      { id: faker.datatype.uuid(), type: 'link', content: '👉 jane.design/doctorcare' },
    ]
  }
}