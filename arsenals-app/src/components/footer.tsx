import { useOktaAuth } from "@okta/okta-react";
import { useCallback } from "react";

export const Footer = () => {
    const { authState, oktaAuth } = useOktaAuth();

    const handleLogin = useCallback(() => {
        console.log("login");
        oktaAuth.signInWithRedirect();
    }, [oktaAuth]);

    const handleLogout = useCallback(() => {
        oktaAuth.signOut();
    }, [oktaAuth]);


    return (
        <footer>
            <hr />
            {
                !authState || !authState.isAuthenticated ?
                    (
                        <>
                            <p>Please login</p>
                            <button type="button" onClick={handleLogin}>Login</button>
                        </>
                    )
                    :
                    (
                        <>
                            <p>You are logged in</p>
                            <button type="button" onClick={handleLogout}>Logout</button>
                        </>
                    )
            }
        </footer>
    )
}