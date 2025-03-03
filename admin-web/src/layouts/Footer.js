import React from "react";

const Footer = ({ title }) => {
    const year = new Date().getFullYear();

    return (
        <footer
            style={{
                textAlign: "center",
                padding: "10px",
                marginTop: "20px",
            }}
        >
            <p>
                &copy; {year} Admin Web Host App . Modules Federated :{" "}
                <b>{title || "No Modules Federated"}</b>
            </p>
        </footer>
    );
};

export default Footer;
