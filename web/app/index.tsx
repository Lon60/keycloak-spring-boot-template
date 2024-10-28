import Link from 'next/link';

const Home = () => (
    <div>
        <h1>Welcome to Next.js Keycloak Demo</h1>
        <Link href="/login/page">
            <a>Login with Keycloak</a>
        </Link>
    </div>
);

export default Home;
