import { useEffect, useCallback, useState } from 'react';
import { useAtomValue, useAtom } from 'jotai';
import { userAtom, tokenAtom, uidAtom } from '../../atoms/atoms';
// import UserPosts from './UserPosts';

const ProfileForm = () => {
  const token = useAtomValue(tokenAtom);
  const uid = useAtomValue(uidAtom);
  const [user, setUser] = useAtom(userAtom);
  const [newUsername, setNewUsername] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const loadData = useCallback(async () => {
    if (!uid) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:1337/api/users/${uid}`, {
        method: 'get',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Error:', error);
    }
  }, [token, uid, setUser]);

  const handleUpdateUserData = async (data) => {
    try {
      const response = await fetch(`http://localhost:1337/api/users/${uid}`, {
        method: 'put',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const updatedUserData = { ...user, ...data };
      setUser(updatedUserData);
      setNewUsername('');
      setNewDescription('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div>
      <h2>User Profile</h2>
      {user && (
        <div>
          <p>Username : {user.username}</p>
          <p>Email : {user.email}</p>
          <p>Description : {user.description}</p>

          <div>
            <input
              type="text"
              placeholder="New username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
            <br />
            <button onClick={() => handleUpdateUserData({ username: newUsername })}>
              Change username
            </button>
          </div>

          <div>
            <input
              type="text"
              placeholder="New description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
            <br />
            <button onClick={() => handleUpdateUserData({ description: newDescription })}>
              Change description
            </button>
          </div>
        </div>
      )}
      {/* <UserPosts /> */}
    </div>
  );
};

export default ProfileForm;
