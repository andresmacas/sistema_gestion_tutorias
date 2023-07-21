import SideNavBar from '@/components/SideNavBar';
import React from 'react';
import AuthRoute from './authRoute';

export default function Home() {

    return (
        <AuthRoute>
            <div className='flex h-screen'>
                <SideNavBar />
            </div>
        </AuthRoute>

    )
}