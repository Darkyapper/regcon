import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Sidebar from '../components/sidebar/Sidebar'
import ConfigDash from '../components/configDash/ConfigDash'


export default function DashboardSettings() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex flex-grow">
                <Sidebar />
                <div className="flex-grow ml-64 p-4 mt-16">
                    <ConfigDash />  
                </div>
            </div>
        </div>
    )
}
