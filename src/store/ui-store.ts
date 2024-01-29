import { create } from 'zustand';

type AlertType = 'success' | 'error';

interface State {
    showAlert: boolean;
    onShowAlert: (alertType: AlertType, alertMessage: string, title: string) => void;
    onHideAlert: () => void;
    alertType: AlertType | undefined;
    alertMessage: string;
    title: string;
}

export const useUiStore = create<State>(set => ({
    showAlert: false,
    onHideAlert: () => set({ showAlert: false }),
    onShowAlert: (alertType: AlertType, alertMessage: string, title: string) =>
        set({ showAlert: true, alertMessage, alertType, title }),
    alertType: undefined,
    alertMessage: '',
    title: '',
}));
