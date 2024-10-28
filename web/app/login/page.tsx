"use client";

import { useEffect } from 'react';

const Page = () => {
    useEffect(() => {
        const redirectUri = window.location.origin + '/callback';
        const loginUrl = `http://localhost:8080/realms/demo/protocol/openid-connect/auth?client_id=web-app&redirect_uri=${encodeURIComponent(
            redirectUri
        )}&response_type=code&scope=openid`;

        window.location.href = loginUrl;
    }, []);

    return <div>Redirecting to login...</div>;
};

export default Page;
