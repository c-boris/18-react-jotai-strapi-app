import { Link } from "react-router-dom";
import { DisconnectButton } from "../DisconnectButton/DisconnectButton";
import { useAtomValue } from "jotai";
import { tokenAtom } from "../../atoms/atoms";

export const Navbar = () => {
  const token = useAtomValue(tokenAtom);

  return (
    <nav>
      <Link to="/">Home </Link>
      {token ? (
        <>
          <Link to="/profile">Profile </Link>
          <DisconnectButton />
        </>
      ) : (
        <>
          <Link to="/login">Log in </Link>
          <Link to="/register">Sign up </Link>
        </>
      )}
    </nav>
  );
};
