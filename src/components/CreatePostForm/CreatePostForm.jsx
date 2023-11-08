import { useState } from "react";
import { useAtomValue } from "jotai";
import { tokenAtom, uidAtom } from "../../atoms/atoms";
import PropTypes from 'prop-types';

export const CreatePostForm = ({ loadPosts }) => {
  const token = useAtomValue(tokenAtom);
  const uid = useAtomValue(uidAtom);

  const [formData, setFormData] = useState({
    text: "",
    users_permissions_user: uid,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:1337/api/posts", {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: formData }),
    })
      .then((response) => response.json())
      .then(
        () => loadPosts(),
        setFormData({ text: "", users_permissions_user: uid })
      )
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <h2>Create a new tweet</h2>
      <form action="" onSubmit={handleSubmit}>
        <textarea
          name="text"
          placeholder="Your Tweet"
          value={formData.text}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

CreatePostForm.propTypes = {
  loadPosts: PropTypes.func.isRequired,
};
