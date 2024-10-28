"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const ProtectedPage = () => {
    const router = useRouter();
    const [response, setResponse] = useState<string | null>(null);

    useEffect(() => {
        // Prüfen, ob der Benutzer eingeloggt ist (ob das access_token vorhanden ist)
        const accessToken = Cookies.get('access_token');
        if (!accessToken) {
            // Umleiten zu /login, wenn der Benutzer nicht eingeloggt ist
            router.push('/login');
        }
    }, [router]);

    const handleRequest = async (endpoint: string) => {
        const accessToken = Cookies.get('access_token');

        if (accessToken) {
            try {
                const response = await fetch(`http://localhost:8081/api${endpoint}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setResponse(`Success: ${JSON.stringify(data)}`);
                } else {
                    const errorData = await response.text();
                    setResponse(`Error: ${errorData}`);
                }
            } catch (error) {
                setResponse(`Request failed: ${error.message}`);
            }
        } else {
            setResponse('No access token found');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8">
            <h1 className="text-3xl font-bold mb-8">Protected Page</h1>
            <div className="flex flex-col gap-4">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => handleRequest('/admin')}
                >
                    Request /admin
                </button>
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    onClick={() => handleRequest('/secured')}
                >
                    Request /secured
                </button>
            </div>
            {response && (
                <div className="mt-8 p-4 border rounded bg-gray-100 text-gray-800">
                    {response}
                </div>
            )}
        </div>
    );
};

export default ProtectedPage;
