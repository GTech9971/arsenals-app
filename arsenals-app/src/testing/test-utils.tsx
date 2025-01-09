import { IonApp } from "@ionic/react";
import { render } from "@testing-library/react";
import { ReactElement } from "react";

const customRender = (ui: ReactElement, options = {}) =>
    render(ui, {
        wrapper: ({ children }) => <IonApp>{children}</IonApp>,
        ...options
    });

// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react';
export { customRender as render };