import { NextFederationPlugin } from "@module-federation/nextjs-mf";

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: (config, { isServer }) => {
        config.plugins.push(
            new NextFederationPlugin({
                name: "adminWeb",
                filename: "static/chunks/remoteEntry.js",
                exposes: {
                    "./Button": "./src/components/Button", // Example component
                },
                remotes: {
                    material:
                        "material@http://localhost:3001/_next/static/chunks/remoteEntry.js",
                },
                shared: {
                    // react: { singleton: true, requiredVersion: false },
                    // "react-dom": { singleton: true, requiredVersion: false },
                },
            })
        );

        return config;
    },
};

export default nextConfig;
