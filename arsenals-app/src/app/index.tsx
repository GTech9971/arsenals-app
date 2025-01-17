import { useHistory } from "react-router-dom"
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import AppRouters from "./routers"
import { Security } from "@okta/okta-react"
import { oktaConfig } from "@/OktaConfig";
import OktaAuth, { toRelativeUrl } from "@okta/okta-auth-js";

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import '../theme/variables.css';
import { env } from "@/config/env";

const oktaAuth = new OktaAuth(oktaConfig);

setupIonicReact();

/** useHistoryはIonicRouter内部で使用しないとundefinedになるためwrap */
const SecurityWrapper = () => {
    const history = useHistory();
    const restoreOriginalUri = (_oktaAuth: unknown, originalUri: string) => {
        let url: string = toRelativeUrl(originalUri || '/', window.location.origin);
        // エイリアス設定を行なっていた場合、/ドメイン名/ドメイン名/のようにURLが書き換えられるので防止
        if (env.ENABLE_API_MOCKING === false && url === `${import.meta.env.BASE_URL}`) { url = '/'; }
        history.replace(url);
    };
    return (
        <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
            <AppRouters />
        </Security>
    )
}

export const App = () => {
    return (
        <IonApp>
            {/* エイリアス付きでアクセスする場合必要 */}
            <IonReactRouter basename={env.ENABLE_API_MOCKING ? undefined : import.meta.env.BASE_URL}>
                <IonRouterOutlet>
                    <SecurityWrapper />
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    )
}