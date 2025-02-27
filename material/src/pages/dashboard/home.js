import dynamic from "next/dynamic";

const DashboardLayout = dynamic(() => import("adminWeb/DashboardLayout"), {
    ssr: false,
});

const Dashboard = () => {
    return (
        <DashboardLayout>
            <h1>This is Material Remote App.</h1>
        </DashboardLayout>
    );
};

export default Dashboard;
