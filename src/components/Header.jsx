import { Link } from "react-router-dom"

const Nav = ({img, title, name}) => {
  return (
    <nav className="nav">
    <Link className="nav" to="/">
    {title}
    </Link>
    </nav>
  )
}


const Header = (props) => {
    const content = {
        navLogo: "https://i.imgur.com/3b3dn2Q.jpg",
        headerImage: "https://i.imgur.com/3b3dn2Q.jpg",
        headerAlt: "The Dark Room Banner"
    }

    const {navLogo: logo, headerImage: img, headerAlt} = content
    return (
        <header style={{height: "360px", overflow: "hidden"}}>
            <Nav title="The Dark Room" alt="logo" img={logo}></Nav>
            <img
            style={{width: "100%"}} 
            alt={headerAlt}
            src={img} 
            />
        </header>
    )
}

export default Header
export {Nav}