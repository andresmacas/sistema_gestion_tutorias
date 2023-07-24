import SideNavBar from '@/components/SideNavBar';
import React from 'react';
import AuthRoute from './authRoute';
import styles from '../styles/Home.module.css';

export default function solicitarTutoria() {
    return (
        <AuthRoute>
            <div className='flex h-screen' style={{ backgroundColor: "#1a1c23" }}>
                <SideNavBar />
                <div className={styles.container}>
                    <div className="grid grid-cols-3 gap-4 items-center">
                        <div class="text-left">
                            <img src="/images/logo_unl.png" alt="Logo" class="w-20 h-20" />
                        </div>
                        <div class="text-center">
                            <h1 class="text-xs font-bold text-white">Facultad de la Industria y los Recursos Naturales No Renovables</h1>
                        </div>
                        <div class="text-right ">
                            <p class="text-xs text-white">Periodo Academico: Febrero 2023- Agosto 2023</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 items-center">

                        <div class="">
                            <p class="text-xs text-white">Programacion I</p>
                        </div>

                        <div class="">
                            <p class="text-xs text-white">Ciclo: 6</p>
                        </div>

                        <div className='justify-items-start'><div id="dropdownNavbar" class="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                            <ul class="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                                <li>
                                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                                </li>
                                <li>
                                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                                </li>
                                <li>
                                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                                </li>
                            </ul>
                            <div class="py-1">
                                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">Sign out</a>
                            </div>
                        </div>
                        </div>

                        <div class="text-right ">
                            <p class="text-xs text-white">Fecha</p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthRoute>
    )
}
