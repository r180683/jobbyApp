import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {BiExit} from 'react-icons/bi'
import './index.css'

const Header = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <Link to="/">
        <img
          className="header-website-logo"
          alt="website logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        />
      </Link>
      <ul className="header-mobile-items">
        <Link to="/">
          <li>
            <button className="header-mobile-item" type="button">
              <AiFillHome className="mobile-item" />
            </button>
          </li>
        </Link>

        <Link to="/jobs">
          <li>
            <button className="header-mobile-item" type="button">
              <BsFillBriefcaseFill className="mobile-item" />
            </button>
          </li>
        </Link>
        <li>
          <button
            onClick={onLogout}
            className="header-mobile-item"
            type="button"
          >
            <BiExit className="mobile-item" />
          </button>
        </li>
      </ul>
      <ul className="header-desktop-items">
        <Link className="list-item" to="/">
          <li>Home</li>
        </Link>
        <Link className="list-item" to="/jobs">
          <li>Jobs</li>
        </Link>
      </ul>
      <button onClick={onLogout} className="logout-btn" type="button">
        Logout
      </button>
    </div>
  )
}
export default withRouter(Header)
