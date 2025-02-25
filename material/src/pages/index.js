import Image from "next/image";
import localFont from "next/font/local";
import dynamic from "next/dynamic";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

const Button = dynamic(() => import("adminWeb/Button"), { ssr: false });

export default function Home() {
    return (
        <>
            HELLO
            <Button />
        </>
    );
}
