import { NextFederationPlugin } from "@module-federation/nextjs-mf";

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // async rewrites() {
    //     return [
    //         {
    //             source: "/api/conversion/conversions",
    //             destination:
    //                 "https://api-dev.kedaipangan.com/internal-process/api/v1/conversion/conversions",
    //         },
    //     ];
    // },
    webpack: (config, { isServer }) => {
        config.plugins.push(
            new NextFederationPlugin({
                name: "material",
                filename: "static/chunks/remoteEntry.js",
                exposes: {
                    "./Button": "./src/components/Button", // Example exposed component
                    "./pageMaterial": "./src/pages/material/master-sku",
                    "./pageSecurity": "./src/pages/security/users",
                    "./api/conversions": "./src/pages/api/conversions.js", // Expose API route
                    "./controllers/conversionsController":
                        "./src/controllers/conversionsController.js", // Expose controller
                },
                remotes: {
                    adminWeb:
                        "adminWeb@http://localhost:3001/_next/static/chunks/remoteEntry.js",
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
