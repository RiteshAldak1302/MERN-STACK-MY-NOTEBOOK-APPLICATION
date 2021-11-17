import {React} from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
const Navbar = () => {
  const location = useLocation();

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" style={{"color":"#dc3545"}} to="#">My Note-book</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname} == "/" ? "active" : "" `}  aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname} == "/about" ? "active" : "" `}  to="/about">About</Link>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item" to="/">Action</Link></li>
                <li><Link className="dropdown-item" to="/">Another action</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="/">Something else here</Link></li>
              </ul>
            </li>
          </ul>
          <form className="d-flex">
          <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
          <Link className="btn btn-primary mx-2" to="/signup" role="button">Signup</Link>
          </form>
        </div>
      </div>
    </nav> 
        </>
    )
}

export default Navbar
