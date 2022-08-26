import { AuthProvider } from "./auth.provider";
import React from 'react';
import RootNavigator from "./rootnavigator";

const Providers = () => {
    return (

        <AuthProvider>
            <RootNavigator />
        </AuthProvider>
    );
};

export default Providers;