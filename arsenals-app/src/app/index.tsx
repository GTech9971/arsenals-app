import { useHistory } from "react-router-dom"
import AppRouters from "./routers"
import { Security } from "@okta/okta-react"
import { oktaConfig } from "@/OktaConfig";
import OktaAuth, { toRelativeUrl } from "@okta/okta-auth-js";

const oktaAuth = new OktaAuth(oktaConfig);

export const App = () => {

    const history = useHistory();
    const restoreOriginalUri = (_oktaAuth: unknown, originalUri: string) => {
        history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
    };

    return (
        <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
            <AppRouters />
        </Security>
    )
}