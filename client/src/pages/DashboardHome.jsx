import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Sidebar from '../components/sidebar/Sidebar'
import DashboardAHome from '../components/dashboardHome/DashboardAHome'
import RecommendedActions from '../components/recommendedActions/RecommendedActions'

export default function DashboardHome() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex flex-grow">
                <Sidebar />
                <div className="flex-grow ml-64 p-4 mt-16">
                    <DashboardAHome />
                    <RecommendedActions />
                </div>
            </div>
        </div>
    )
}
