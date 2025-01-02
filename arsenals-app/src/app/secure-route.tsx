import { toRelativeUrl } from "@okta/okta-auth-js";
import { useOktaAuth } from "@okta/okta-react"
import React, { useEffect, useState } from "react";
import { Route, RouteProps, useRouteMatch } from "react-router-dom";

export type SecureRouteProps = {
    routeProps: RouteProps,
}

export const SecureRoute: React.FC<RouteProps> = ({ ...routeProps }) => {
    const { oktaAuth, authState } = useOktaAuth();
    const match = useRouteMatch();
    const isPending = React.useRef(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!match) { return; }
        if (!authState) { return; }
        if (authState.isAuthenticated) {
            isPending.current = false;
            return;
        }

        if (!authState?.isAuthenticated) {
            if (isPending.current) { return; }
            isPending.current = true;

            const originalUri = toRelativeUrl(window.location.href, window.location.origin);
            oktaAuth.setOriginalUri(originalUri);
            oktaAuth.signInWithRedirect();
        }


    }, [isPending, match, oktaAuth, authState, authState?.isAuthenticated]);

    if (error) {
        return <div>{error.message}</div>
    }

    if (!authState || !authState?.isAuthenticated) {
        return <div>Loading...</div>;
    }

    return (
        <Route
            {...routeProps}
        />
    )
}