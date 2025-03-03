import DashboardLayout from "/src/layouts/DashboardLayout";
import Footer from "/src/layouts/Footer";

const Dashboard = () => {
    return (
        <DashboardLayout>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh",
                }}
            >
                <main style={{ flex: 1 }}>
                    <h1>This is Admin Web Host App.</h1>
                </main>
                <Footer />
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;
