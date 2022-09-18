import { Link } from "react-router-dom"

const Nav = ({img, title, name}) => {
  return (
    <nav className="nav">
    <Link to="/">
    <img src={img} alt={name} role="presentation"/>
    </Link>
    <div>{title}</div>
    </nav>
  )
}


const Header = (props) => {
    const content = {
        navLogo: "https://i.imgur.com/FLJwv37.jpeg",
        headerImage: "https://i.imgur.com/FLJwv37.jpeg",
        headerAlt: "Orange cat looking at camera"
    }

    const {navLogo: logo, headerImage: img, headerAlt} = content
    return (
        <header style={{height: "360px", overflow: "hidden"}}>
            <Nav title="Photography" alt="logo" img={logo}></Nav>
            <img
            style={{width: "25px"}} 
            alt={headerAlt}
            src={img} 
            />
        </header>
    )
}

export default Header
export {Nav}