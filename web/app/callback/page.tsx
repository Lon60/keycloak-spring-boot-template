"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

const Callback = () => {
    const router = useRouter();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');

        if (code) {
            fetch('http://localhost:8080/realms/demo/protocol/openid-connect/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    grant_type: 'authorization_code',
                    code: code,
                    redirect_uri: 'http://localhost:3000/callback',
                    client_id: 'web-app',
                }),
            })
                .then(async (response) => {
                    if (response.ok) {
                        const data = await response.json();
                        const { access_token, refresh_token, id_token } = data;

                        Cookies.set('access_token', access_token, {
                            expires: 1 / 288, // 5 min
                            secure: process.env.NODE_ENV === 'production',
                            sameSite: 'Strict',
                            path: '/',
                        });

                        Cookies.set('refresh_token', refresh_token, {
                            expires: 1 / 48, // 30 min
                            secure: process.env.NODE_ENV === 'production',
                            sameSite: 'Strict',
                            path: '/',
                        });

                        Cookies.set('id_token', id_token, {
                            expires: 1 / 288, // 5 min
                            secure: process.env.NODE_ENV === 'production',
                            sameSite: 'Strict',
                            path: '/',
                        });

                        router.push('/');
                    } else {
                        console.error('Failed to exchange code for token.');
                    }
                })
                .catch((error) => console.error('Authentication request failed.', error));
        }
    }, [router]);

    return <div>Authenticating...</div>;
};

export default Callback;
