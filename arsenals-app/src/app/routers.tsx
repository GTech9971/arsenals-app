import { Route, Switch, } from "react-router-dom"
import { LoginCallback, } from "@okta/okta-react";
import { SecureRoute } from "./secure-route";
import { View } from "./routes/view";
import { RegistryGun } from "./routes/registry-gun";
import { Home } from "./routes/home";

const AppRouters = () => {

    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/home" exact component={Home} />
            {/* <SecureRoute path="/" exact component={View} /> */}
            <SecureRoute path="/view" component={View} />
            <Route path="/login/callback" render={() => (<LoginCallback />)} />

            <SecureRoute path="/registry" component={RegistryGun} />
        </Switch>
    )
}

export default AppRouters;