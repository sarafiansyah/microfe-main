import Head from "next/head";
import Login from "/src/components/auth/login";

export default function Home() {
    return (
        <>
            <Head>
                <title>Login | My App</title>
                <meta name="description" content="Login page for My App" />
            </Head>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    height: "100vh",
                    alignItems: "center",
                }}
            >
                <Login />
            </div>
        </>
    );
}
