import { useEffect, useState } from 'react';

import './services/mirage';

import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Post, PostType } from './components/Post';

import './global.css';

import styles from './App.module.css';

function App() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  useEffect(() => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then((json) => {
        setPosts(json.posts);
        setLoadingPosts(false);
      });
  }, []);

  return (
    <>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {loadingPosts ? (
            <p>Carregando...</p>
          ) : (
            <>
              {posts.map((post) => (
                <Post key={post.id} post={post} />
              ))}
            </>
          )}
        </main>
      </div>
    </>
  );
}

export default App;
