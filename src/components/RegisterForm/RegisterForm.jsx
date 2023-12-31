import { useState } from 'react'
import Cookies from "js-cookie"
import { useNavigate } from 'react-router-dom'
import { useSetAtom} from 'jotai'
import { tokenAtom, uidAtom } from "../../atoms/atoms";

export const RegisterForm = () => {

  const navigate = useNavigate();

  const setToken = useSetAtom(tokenAtom)
  const setUid = useSetAtom(uidAtom);

  const [formData, setFormData] = useState(
    {
      username: "",
      email: "",
      password: ""
    }
  )

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  
    fetch("http://localhost:1337/api/auth/local/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((response) => {
        Cookies.set("token", response.jwt);
        Cookies.set("uid", response.user.id);
        setToken(response.jwt);
        setUid(response.user.id);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      <input type="text" name='username' placeholder='Pseudo' value={formData.username} onChange={handleChange}/><br />
      <input type="email" name='email' placeholder='Email' value={formData.email} onChange={handleChange}/><br />
      <input type="password" name='password' placeholder='Mot de passe' value={formData.password} onChange={handleChange}/><br />
      <button type="submit">Sign up</button>
    </form>
  )
}
