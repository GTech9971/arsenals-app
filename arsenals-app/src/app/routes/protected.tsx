import { useOktaAuth } from "@okta/okta-react";

export const Protected = () => {
    console.log("protected");

    const { authState, oktaAuth } = useOktaAuth();

    const handleLogout = () => oktaAuth.signOut();


    return (
        <>
            <p>protected page</p>

            <hr />

            {
                !authState || !authState.isAuthenticated
                    ?
                    (
                        <></>
                    )
                    :
                    (
                        <>
                            <p>logged in</p>
                            <button onClick={handleLogout}>logout</button>
                        </>
                    )
            }
        </>
    )
}