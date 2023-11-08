import { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { tokenAtom, uidAtom } from '../../atoms/atoms';

const UserPosts = () => {
  const token = useAtomValue(tokenAtom);
  const uid = useAtomValue(uidAtom);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    console.log('Token:', token);
  console.log('UID:', uid);
    
    if (token && uid) {
      fetch(`http://localhost:1337/api/posts?users_permissions_user.id=${uid}`, {
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          setUserPosts(response.data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [token, uid]);

  return (
    <div>
      <h2>User Posts</h2>
      {userPosts.map((post) => (
        <div key={post.id}>
          <p>{post.attributes.text}</p>
        </div>
      ))}
    </div>
  );
};

export default UserPosts;
