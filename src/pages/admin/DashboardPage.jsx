import React from 'react';
import BannerManager from '../../components/admin/BannerManager';
import BlocksManager from '../../components/admin/BlocksManager';
import AboutPageManager from '../../components/admin/AboutPageManager'; // Import the new component

function DashboardPage() {
    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center " style={{ color: "white" }}>Admin Dashboard</h2>

            {/* Management Components */}
            <AboutPageManager /> {/* Add the About Page Manager */}

            <hr className="my-5"/>

            <BannerManager />

            <hr className="my-5"/>

            <BlocksManager />

            {/* Add other admin sections here */}
        </div>
    );
}

export default DashboardPage;