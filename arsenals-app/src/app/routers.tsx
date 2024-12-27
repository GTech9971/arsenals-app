import { Route, Routes, useNavigate } from "react-router-dom"

import Home from "./routes/home";
import OktaAuth, { toRelativeUrl } from "@okta/okta-auth-js";
import { oktaConfig } from "../OktaConfig";
import { LoginCallback, Security } from "@okta/okta-react";
import { RequiredAuth } from "./secure-route";
import { Footer } from "../components/footer";
import { Protected } from "./routes/protected";

const oktaAuth = new OktaAuth(oktaConfig);

const AppRouters = () => {

    const navigate = useNavigate();
    const restoreOriginalUri = (_: OktaAuth, originalUri: string) => {
        navigate(toRelativeUrl(originalUri || '/', window.location.origin));
    }

    return (
        <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
            <div>
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="login/callback" element={<LoginCallback />} />
                        <Route path="/protected" element={<RequiredAuth />}>
                            <Route path="" element={<Protected />} />
                        </Route>
                    </Routes>
                </main>
                <Footer />
            </div>
        </Security>
    )
}

export default AppRouters;