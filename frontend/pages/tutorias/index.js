import SideNavBar from "@/components/SideNavBar";
import styles from '../../styles/Home.module.css';
import Head from "next/head";
import AuthRoute from "../authRoute";
import Image from "next/image";
import { useState, useEffect } from "react";
import { obtenerRol } from "../api/api";
import Link from "next/link";
export default function Tutorias() {
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



    const [data, setData] = useState([
        {
            tema: 'React',
            modalidad: 'presencial',
            docente: 'Rene Guaman', //desde reg tutoria
            materia: 'Gestion de Redes', //desde reg tutoria
            fechaTutoria: '2023-06-10', //desde reg tutoria
            horaInicio: '15:00', // hora de inicio de la tutoria **
            estado: 'Finalizada', //Aprobada, Negada, Pendiente, Finalizada
            horas: '1',
            fechaSolicitada: '2023-07-23',
            fechaAceptada: '2023-07-23',
            external_registroTutorias: 'fbbf2f08-181f-461d-b47d-04063b7cb22a'
        },
        {
            tema: 'JavaScript',
            modalidad: 'virtual',
            docente: 'Ana Perez',
            materia: 'Programación Web',
            fechaTutoria: '2023-07-15',
            horaInicio: '10:30',
            estado: 'Pendiente',
            horas: '1.5',
            fechaSolicitada: '2023-07-10',
            external_registroTutorias: 'c8a2dd0c-bd85-40a4-9fe7-8c7397c4e2e1'
        },
        {
            tema: 'JavaScript',
            modalidad: 'virtual',
            docente: 'Ana Perez',
            materia: 'Programación Web',
            fechaTutoria: '2023-07-15',
            horaInicio: '10:30',
            estado: 'Negada',
            horas: '1.5',
            fechaSolicitada: '2023-07-10',
            external_registroTutorias: 'c8a2dd0c-bd85-40a4-9fe7-8c7397c4e2e1'
        },
        // Agrega más conjuntos de datos aquí si es necesario
    ]);
    return (
        <AuthRoute>
            <div className="flex h-screen rounded-lg" style={{ backgroundColor: '#1a1c23' }}>
                <Head>
                    <title>Tutorias</title>
                </Head>
                <SideNavBar />
                <div className={styles.container}>
                    <h1 className={styles.tittle}>Tutorias</h1>
                    <table className="h-full w-full whitespace-no-wrap">
                        <thead>
                            <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                <th class="px-4 py-3">Materia</th>
                                <th class="px-4 py-3">Tema</th>
                                <th class="px-4 py-3">Estado</th>
                                <th class="px-4 py-3">Fecha</th>
                                <th class="px-4 py-3">Accion</th>

                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                            {data.map((tutoria, index) => (
                                <tr key={index} className="text-gray-700 dark:text-gray-400">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center text-sm">
                                            <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                                                <Image
                                                    className="object-cover w-full h-full rounded-full"
                                                    src="/images/logo_unl.png"
                                                    alt=""
                                                    width={32}  // Ancho de la imagen en píxeles
                                                    height={32} // Altura de la imagen en píxeles
                                                    loading="lazy"
                                                />
                                                <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                                            </div>
                                            <div>
                                                <p className="font-semibold">{tutoria.materia}</p>
                                                <p className="text-xs text-gray-600 dark:text-gray-400">{tutoria.docente}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-sm">{tutoria.tema}</td>
                                    <td className="px-4 py-3 text-xs">
                                        <span className={`px-2 py-1 font-semibold leading-tight ${tutoria.estado === 'Aprobada' ? 'text-green-700 bg-green-100 dark:bg-green-700 dark:text-green-100 rounded-full' : tutoria.estado === 'Negada' ? 'rounded-full text-red-700 bg-red-100 dark:bg-red-700 dark:text-red-100' : tutoria.estado === 'Pendiente' ? 'rounded-full text-orange-700 bg-orange-100 dark:text-white dark:bg-orange-600' : ' rounded-full text-gray-700 bg-gray-100 dark:text-gray-100 dark:bg-gray-700'}`}>
                                            {tutoria.estado}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm">
                                        {tutoria.fechaTutoria}
                                        <p className="text-xs text-gray-600 dark:text-gray-400">{tutoria.horaInicio} - {tutoria.horas} hora(s)</p>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center space-x-4 text-sm">
                                            <button className="items-center justify-between px-4 py-2 text-sm text-white transition-colors duration-1000 bg-purple-600 border border-transparent rounded-lg hover:bg-purple-700 w-fit">
                                                Detalles
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                    {role === 'docente' ? (
                        <div className="mt-5">
                            <Link href="/tutorias/pendientes" passHref>
                                <button className="mt-4 items-center justify-between px-4 py-2 text-sm text-white transition-colors duration-1000 bg-purple-600 border border-transparent rounded-lg hover:bg-purple-700 w-fit">
                                    Ver Tutorias Pedientes
                                </button>
                            </Link>
                            <Link href="/tutorias/registro" passHref>
                                <button className="ml-3 mt-4 items-center justify-between px-4 py-2 text-sm text-white transition-colors duration-1000 bg-purple-600 border border-transparent rounded-lg hover:bg-purple-700 w-fit">
                                    Crear una registro de tutorias
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
        </AuthRoute>
    )
}
