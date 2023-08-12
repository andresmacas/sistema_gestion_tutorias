import SideNavBar from "@/components/SideNavBar";
import styles from '../../styles/Home.module.css';
import Head from "next/head";
import AuthRoute from "../authRoute";
import moment from 'moment';
import Image from "next/image";
import { useState, useEffect } from "react";
import { obtenerRol, listarTutorias, tutoriasDoc, asignaturasEst } from "../api/api";
import Link from "next/link";
export default function Tutorias() {
    const [role, setRole] = useState('');
    const [data, setData] = useState([]); // Estado para almacenar todas las tutorías

    useEffect(() => {
        obtenerRol().then(rol => {
            const userRole = rol;
            setRole(userRole);
            console.log(rol);
        });

        // Lógica para obtener tutorías según el rol
        const
            fetchTutorias = async () => {
                let tutorias = [];
                if (role === 'docente') {
                    console.log("Cargando tutorias docente");
                    tutorias = await tutoriasDoc();
                } else if (role === 'estudiante') {
                    tutorias = await asignaturasEst();
                }
                setData(tutorias);
            };

        fetchTutorias();
    }, [role]);


    return (
        <AuthRoute>
            <div className={styles.general}>
                <Head>
                    <title>Tutorias</title>
                </Head>
                <SideNavBar />
                <div className={styles.container}>
                    <h1 className={styles.tittle}>Tutorias</h1>
                    <table className="h-full w-full whitespace-no-wrap">
                        <thead>
                        <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                <th class="px-4 py-3">Materia</th>
                                <th class="px-4 py-3 text-center">Tema</th>
                                <th class="px-4 py-3 text-center">Estado</th>
                                <th class="px-4 py-3 text-center">Fecha</th>
                                <th class="px-4 py-3 text-center">Acción</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                            {data.map((tutoria, index) => (
                                <tr key={index} className="text-gray-700 dark:text-gray-400">
                                    {(tutoria.estado == "Finalizada" && <div></div>)}
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
                                    <td className="px-4 py-3 text-xs text-center">
                                        <span className={`px-2 py-1 font-semibold leading-tight ${tutoria.estado === 'Aprobada' ? 'text-green-700 bg-green-100 dark:bg-green-700 dark:text-green-100 rounded-full' : tutoria.estado === 'Rechazada' ? 'rounded-full text-red-700 bg-red-100 dark:bg-red-700 dark:text-red-100' : tutoria.estado === 'Solicitada' ? 'rounded-full text-orange-700 bg-orange-100 dark:text-white dark:bg-orange-600' : ' rounded-full text-gray-700 bg-gray-100 dark:text-gray-100 dark:bg-gray-700'}`}>
                                            {tutoria.estado}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-center">
                                    {moment(tutoria.fecha_solicitada).format('YYYY-MM-DD')}
                                        <p className="text-xs text-gray-600 dark:text-gray-400">{moment(tutoria.fecha_solicitada).format('HH:mm')} - {tutoria.horas} hora(s)</p>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <div>
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
                                    Ver Tutorías Solicitadas
                                </button>
                            </Link>
                            <Link href="/tutorias/registro" passHref>
                                <button className="ml-3 mt-4 items-center justify-between px-4 py-2 text-sm text-white transition-colors duration-1000 bg-purple-600 border border-transparent rounded-lg hover:bg-purple-700 w-fit">
                                    Crear una registro de tutorías
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