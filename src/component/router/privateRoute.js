import { Redirect, Route } from "react-router";
import useAuth from "../../hooks/useAuth"

const PrivateRoute = ({ children, ...rest }) => {
    const auth = useAuth();
    console.log('auth', auth);
    return (
        <Route
         {...rest}
         render={({ location }) =>
             auth && auth.loggedin ? (
                 children
             ) : 
             (
                <Redirect
                to={{
                  pathname: "/",
                  state: { from: location }
                }}
              />
             )
         }
        />
    );
}

export default PrivateRoute;