import { IonApp } from "@ionic/react";
import { render } from "@testing-library/react";
import { ReactElement } from "react";

const customRender = (ui: ReactElement, options = {}) =>
    render(ui, {
        wrapper: ({ children }) => <IonApp>{children}</IonApp>,
        ...options
    });

export * from '@testing-library/react';
export { customRender as render };