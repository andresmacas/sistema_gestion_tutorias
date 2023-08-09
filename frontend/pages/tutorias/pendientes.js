import React from 'react'
import SideNavBar from "@/components/SideNavBar";
import styles from '../../styles/Home.module.css';
import Head from "next/head";
import AuthRoute from "../authRoute";
import Image from "next/image";
import { useState, useEffect } from "react";
import { obtenerRol } from '../api/api';
export default function pendientes() {
    const [role, setRole] = useState('');
    useEffect(() => {
        obtenerRol().then(rol => {
            const userRole = rol;
            setRole(userRole);
            console.log(rol);
        });
        // Cambia esto por tu lógica real

        // Lógica para obtener tutorías pendientes aquí
        // Actualiza el estado de tutoriasPendientes con los datos obtenidos
    }, []);

    return (
        <AuthRoute>
            <Head>
                <title>Tutorias</title>
            </Head>

            {role === 'docente' ? (
                <div className="flex h-screen rounded-lg" style={{ backgroundColor: '#1a1c23' }}>
                    <SideNavBar />
                    <div className={styles.container}>
                        <h1 className={styles.tittle}>Tutorias Pendientes</h1>
                        
                    </div>
                </div>
            ) : (
                <div className="flex h-screen rounded-lg" style={{ backgroundColor: '#1a1c23' }}>
                    <SideNavBar />
                    <div className={styles.container}>
                        <h1 className={styles.tittle}>ERROR - Recurso no autorizado</h1>
                    </div>
                </div>
            
            )}

        </AuthRoute>
    )
}
