import { createServer } from "miragejs";

import { PostMock } from '../mocks/post.mock';

const server = createServer();

server.get("/api/posts", { posts: Array.from({ length: 10 }, () => {
  return PostMock();
}) });