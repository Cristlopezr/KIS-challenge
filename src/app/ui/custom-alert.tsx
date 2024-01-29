'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useUiStore } from '@/store/ui-store';
import { Check, XCircle } from 'lucide-react';
import { useEffect } from 'react';

export const CustomAlert = () => {
    const { showAlert, onHideAlert, alertType, title, alertMessage } = useUiStore(state => state);

    useEffect(() => {
        let timeOutId: NodeJS.Timeout;
        if (showAlert) {
            timeOutId = setTimeout(() => {
                onHideAlert();
            }, 2000);
        }

        return () => {
            clearTimeout(timeOutId);
        };
    }, [showAlert]);

    return (
        <Alert
            variant={alertType === 'error' ? 'destructive' : 'default'}
            className={`px-10 absolute ${
                showAlert ? 'top-20' : '-top-52'
            } transition-all duration-500 w-[60%] left-1/2 -translate-x-1/2 ${
                alertType === 'success'
                    ? 'border border-green-500 text-green-500'
                    : 'border border-destructive'
            }`}
        >
            {alertType === 'success' && <Check className='w-10 h-10' style={{ color: 'rgb(34 197 94)' }} />}
            {alertType === 'error' && <XCircle className='w-8 h-8' />}
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{alertMessage}</AlertDescription>
        </Alert>
    );
};
