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

      <div>
          <thead className='w-full'>
            <tr className="text-xs font-semibold tracking-wide text-center text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-900">
              <Link href="https://unl.edu.ec/acceso-pcd">
                <th className="px-4 py-3 hover:text-white transition-all">Acceso P C D</th>
              </Link>

              <Link href="https://estudiantes.unl.edu.ec/" >
                <th className="px-4 py-3 hover:text-white transition-all">SGA Estudiantes</th>
              </Link>

              <Link href="https://siaaf.unl.edu.ec/" >
                <th className="px-4 py-3 hover:text-white transition-all">SIAAF</th>
              </Link>

              <Link href="https://docentes.unl.edu.ec/" >
                <th className="px-4 py-3 hover:text-white transition-all">SGA Docentes</th>
              </Link>

              <Link href="https://eva.unl.edu.ec/" >
                <th className="px-4 py-3 hover:text-white transition-all">EVA</th>
              </Link>

              <Link href="https://elsa.unl.edu.ec/" >
                <th className="px-4 py-3 hover:text-white transition-all">ELSA</th>
              </Link>

              <Link href="https://mail.google.com/a/unl.edu.ec" >
                <th className="px-4 py-3 hover:text-white transition-all">Correo Institucional</th>
              </Link>

              <Link href="https://unl.edu.ec/gaceta" >
                <th className="px-4 py-3 hover:text-white transition-all">Caceta Oficial UNL</th>
              </Link>
            </tr>
          </thead>
      </div>

      <div style={{ position: 'absolute', top: '45px', left: '10px', height: '59px', width: '200px', backgroundImage: `url(${logo.src})`, backgroundSize: 'cover' }} />

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
