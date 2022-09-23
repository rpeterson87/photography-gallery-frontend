import { Link } from "react-router-dom";

const Nav = ({ img, title, alt, user, handleLogout, counter }) => {
  const info = { ...user };
  return (
    <nav className="nav">
      <Link className="nav" to="/">
        {title}
      </Link>
      <h1 style={{ color: "white" }}>{counter}</h1>
      <div>
        {user && info._id ? (<Link className="nav2" onClick={handleLogout} to="/auth/logout">Logout {info.username}</Link>) :
          <><Link className="nav2" to="/auth/login">Login</Link>
            <Link className="nav2" to="/auth/register">Register</Link></>
        }
      </div>
    </nav>
  )
};


const Header = (props) => {
  const content = {
    navLogo: "https://i.imgur.com/3b3dn2Q.jpg",
    headerImage: "https://i.imgur.com/3b3dn2Q.jpg",
    headerAlt: "The Dark Room Banner"
  };

  const { navLogo: logo, headerImage: img, headerAlt } = content;
  return (
    <header style={{ height: "100%", overflow: "hidden" }}>
      <Nav title="The Dark Room" alt="logo" img={logo} user={props.user} handleLogout={props.handleLogout} />
      <img
        style={{ width: "100%" }}
        alt={headerAlt}
        src={img}
      />
    </header>
  )
};

export default Header;
export { Nav };