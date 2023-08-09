import Head from "next/head";
import AuthRoute from "./authRoute";
import SideNavBar from "@/components/SideNavBar";
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import Link from 'next/link';
import Image from "next/image";
export default function asignaturas() {
    const [llamada, setLlamada] = useState(false);

    const [data, setData] = useState([{
        asignatura: 'sistemaOperativos',
        periodo: '2023A',
        paralelo: 'A',
        carrera: 'Ingeniería en Sistemas',
        facultad: 'Facultad de la Industria y los Recursos Naturales No Renovables',
        ciclo: "6",
        fechaEmision: '2023-07-23',
        external_persona: '081fe046-e4b6-4b7c-b5fc-ff7cc6cb1e34'
    },
    {
        asignatura: 'Redes',
        periodo: '2023A',
        paralelo: 'A',
        carrera: 'Ingeniería en Sistemas',
        facultad: 'Ingeniería y',
        ciclo: "6",
        fechaEmision: '2023-07-23',
        external_persona: '081fe046-e4b6-4b7c-b5fc-ff7cc6cb1e34'
    }]);

    /*    if (!llamada) {
            //        obtenerPersonaActual().then((data) => {
    
            //    if (data) {
            const aux = {
                asignatura: data.asignatura,
                periodo: data.periodo,
                paralelo: data.paralelo,
                carrera: data.carrera,
                facultad: data.facultad,
                fechaEmision: data.fechaEmision,
                external_persona: data.external_persona
            };
    
            setData(aux);
            console.log(data);
            setLlamada(true);
            //  }
            //      }).catch((error) => {
            //        console.log(error);
            //  });
        }
    */
    return (
        <AuthRoute>
            <div className='flex h-screen' style={{ backgroundColor: "#1a1c23" }}>
                <Head>
                    <title>Asignaturas</title>
                </Head>
                <SideNavBar />
                <div className={styles.container}>

                    <h1 className={styles.tittle}>Asignturas</h1>
                    <table className="h-full w-full whitespace-no-wrap">
                        <thead>
                            <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                <th class="px-4 py-3">Materia</th>
                                <th class="text-center px-4 py-3">Ciclo</th>
                                <th class="text-center px-4 py-3">Carrera</th>
                                <th class="text-center px-4 py-3">Accion</th>

                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                            {data.map((item, index) => (
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
                                                <p className="font-semibold">{item.asignatura}</p>
                                                <p className="text-xs text-gray-600 dark:text-gray-400">{item.facultad}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-center">{item.ciclo}</td>
                                    <td className="px-4 py-3 text-xs text-center">
                                        <span className={`px-2 py-1 font-semibold leading-tight`}>
                                            {item.carrera}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-center">
                                        <div>
                                            <Link href="/solicitarTutoria" passHref>
                                                <button className="items-center justify-between px-4 py-2 text-sm text-white transition-colors duration-1000 bg-purple-600 border border-transparent rounded-lg hover:bg-purple-700 w-fit"
                                                >Solicitar Tutoria</button>
                                            </Link>
                                        </div>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthRoute>
    )
}