import SideNavBar from '@/components/SideNavBar';
import React from 'react';
import AuthRoute from './authRoute';
import styles from '../styles/Home.module.css';
export default function Home() {

    return (
        <AuthRoute>
            <div className='flex h-screen' style={{ backgroundColor: "#1a1c23" }}>
                <SideNavBar/>
                <div className={styles.container}>
                </div>
            </div>
        </AuthRoute>

    )
}