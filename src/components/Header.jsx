import { Link } from "react-router-dom"

const Nav = () => {
  return (
    <nav className="nav">
    <Link>
    <div>Nav</div>
    </Link>
    </nav>
  )
}


const Header = () => {
    return (
        <header>
            Header
            <Nav></Nav>
        </header>
    )
}

export default Header
export {Nav}