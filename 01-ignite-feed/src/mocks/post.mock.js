import { faker } from '@faker-js/faker';

export const PostMock = () => {
  return  {
    id: faker.datatype.uuid(),
    author: {
      avatarUrl: faker.image.avatar(),
      name: faker.name.findName(),
      role: faker.name.jobTitle(),
    },
    publishAt:faker.date.recent(),
    content: [
      { type: 'paragraph', content: 'Fala galera 👋' },
      { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀' },
      { type: 'link', content: '👉 jane.design/doctorcare' },
    ]
  }
}