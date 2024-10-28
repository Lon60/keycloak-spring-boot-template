import Link from 'next/link';

const Home = () => (
    <div>
        <h1>Welcome to Next.js Keycloak Demo</h1>
        <Link href="/login">
            Login with Keycloak
        </Link>
    </div>
);

export default Home;
