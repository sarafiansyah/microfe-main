import { NextFederationPlugin } from "@module-federation/nextjs-mf";

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: (config, { isServer }) => {
        config.plugins.push(
            new NextFederationPlugin({
                name: "material",
                filename: "static/chunks/remoteEntry.js",
                exposes: {
                    "./Button": "./src/components/Button", // Example exposed component
                    "./pageMaterial": "./src/pages/material/master-sku",
                    "./pageSecurity": "./src/pages/security/users",
                },
                remotes: {
                    adminWeb:
                        "adminWeb@http://localhost:3000/_next/static/chunks/remoteEntry.js",
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
