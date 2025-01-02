import { Route, Switch, } from "react-router-dom"
import Home from "./routes/home";
import { LoginCallback, } from "@okta/okta-react";
import { Protected } from "./routes/protected";
import { SecureRoute } from "./secure-route";

const AppRouters = () => {

    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login/callback" render={() => (<LoginCallback />)} />
            <SecureRoute path="/protected" component={Protected} />
        </Switch>
    )
}

export default AppRouters;