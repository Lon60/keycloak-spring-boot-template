export const exchangeCodeForToken = async (code: string) => {
    const response = await fetch(`/api/auth?code=${code}`, {
        method: 'POST',
    });

    if (!response.ok) {
        throw new Error('Authentication failed');
    }
};
