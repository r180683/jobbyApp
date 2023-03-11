import Cookies from 'js-cookie'
import {Redirect, Route} from 'react-router-dom'

const Protected = props => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Route {...props} />
  }
  return <Redirect to="/login" />
}

export default Protected
