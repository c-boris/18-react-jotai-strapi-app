import { useEffect, useState } from 'react';
import { Post } from '../Post/Post';
import { CreatePostForm } from '../CreatePostForm/CreatePostForm';
import { useAtomValue } from 'jotai';
import { tokenAtom } from '../../atoms/atoms';

export const Posts = () => {
  const token = useAtomValue(tokenAtom);
  const [posts, setPosts] = useState([]);

  const loadPosts = () => {
    fetch('http://localhost:1337/api/posts', {
      method: 'get',
    })
      .then((response) => response.json())
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <>
      {token ? <CreatePostForm loadPosts={loadPosts} /> : null}
      <h2>Latest tweets:</h2>
      {posts.map((post) => (
        <Post key={post.id} data={post} />
      ))}
    </>
  );
};
