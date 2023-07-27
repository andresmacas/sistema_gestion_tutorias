import styles from '../styles/Usuals.module.css'
import bg from '../public/images/unl_background.jpg';
import logo from '../public/images/logo_unl_home.png';
import React, { Component } from 'react'
import Head from 'next/head';
import Link from 'next/link';

export default function Index() {

  return (
    <div className={styles.container} style={{ backgroundImage: `url(${bg.src})`, height: '100vh', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
      <Head>
        <title>Gestión de Tutorías</title>
      </Head>
      <div style={{ position: 'absolute', top: '10px', left: '10px', height: '59px', width: '200px', backgroundImage: `url(${logo.src})`, backgroundSize: 'cover' }} />
      <div className={styles.container}>
        <div className={styles.containerTarget}>
          <h1 className={styles.tittle}>Sistema de gestión de tutorías</h1>
          <h1 className={styles.minimalist}>
            Nuestro compromiso con la excelencia educativa ha sido el motor impulsor para desarrollar el nuevo sistema de gestión de tutorías, orientado a docentes y estudiantes, nuestro objetivo es simplificar el acceso y seguimiento de las tutorías, permitiendo una comunicación efectiva entre los docentes y sus alumnos. A través de esta plataforma, aspiramos a brindar una experiencia más fluida y enriquecedora, enfocada en el desarrollo personal y académico de cada estudiante.
          </h1>
          <Link href="/login" passHref>
            <button className={styles.button} style={{ width: '150px' }}>Iniciar sesión</button>
          </Link>
        </div>
      </div>
    </div>
  )

}
