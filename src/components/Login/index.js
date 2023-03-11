import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', showError: false}

  updateUsername = event => {
    this.setState({username: event.target.value})
  }

  updatePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = error => {
    this.setState({errorMsg: error, showError: true})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    console.log(data)
    console.log(data.jwt_token)
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showError, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <form onSubmit={this.onSubmitForm} className="form-container">
          <div className="website-logo">
            <img
              className="form-logo"
              alt="website logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            />
          </div>
          <div className="input-container">
            <label htmlFor="username" className="label-element">
              USERNAME
            </label>
            <input
              onChange={this.updateUsername}
              placeholder="Username"
              className="input-element"
              value={username}
              id="username"
              type="text"
            />
          </div>
          <div className="input-container">
            <label htmlFor="password" className="label-element">
              PASSWORD
            </label>
            <input
              onChange={this.updatePassword}
              placeholder="Password"
              className="input-element"
              value={password}
              id="password"
              type="password"
            />
          </div>
          <button className="login-btn" type="submit">
            Login
          </button>
          {showError ? <p className="error-msg">{errorMsg}</p> : ''}
        </form>
      </div>
    )
  }
}

export default Login
