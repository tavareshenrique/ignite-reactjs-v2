import { createServer } from 'miragejs';

import { postMock } from '../mocks/post.mock';

const server = createServer();

server.get('/api/posts', {
  posts: Array.from({ length: 10 }, (_, index) =>
    postMock({ isFirst: index === 0 })
  ),
});
