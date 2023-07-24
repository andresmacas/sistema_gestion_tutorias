import SideNavBar from '@/components/SideNavBar';
import React from 'react';
import AuthRoute from './authRoute';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { editarPersonaActual, obtenerPersonaActual } from './api/api';
export default function Configuracion() {
    const router = useRouter();
    const [llamada, setLlamada] = useState(false);
    const [data, setData] = useState({
        apellidos: '',
        nombres: '',
        identificacion: '',
        direccion: '',
        telefono: '',
        tipo_persona: "estudiante",
        cuenta: {
            correo: '',
            clave: '',
        }
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name == "correo" || name == "clave") {
            setData((prevData) => ({
                ...prevData,
                cuenta: {
                    ...prevData.cuenta,
                    [name]: value,
                },
            }));
        } else {
            setData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    }

    if (!llamada) {
        obtenerPersonaActual().then((data) => {

            if (data) {
                const aux = {
                    apellidos: data.data.Apellidos,
                    identificacion: data.data.Identificacion,
                    nombres: data.data.Nombres,
                    telefono: data.data.Telefono,
                    direccion: data.data.Direccion,
                    tipo_persona: data.data.Rol,
                    cuenta: {
                        correo: data.data.Correo,
                        clave: data.data.Clave,
                    }
                }
                setData(aux);
                console.log(data);
                setLlamada(true);
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data);
        editarPersonaActual(data).then((response) => {
            console.log(response);
            if (response.code != "200 OK") {
                alert("Contraseña Incorrecta");
                router.reload();
            } else {
                router.reload();
            }
        });
        setData({
            apellidos: '',
            nombres: '',
            identificacion: '',
            direccion: '',
            telefono: '',
            tipo_persona: "estudiante",
            cuenta: {
                correo: '',
                clave: '',
            }
        });

    };

    return (
        <AuthRoute>
            <div className='flex h-screen' style={{ backgroundColor: "#1a1c23" }}>
                <SideNavBar />
                <form className={styles.container} onSubmit={handleSubmit}>
                    <div >
                        <h1 className={styles.tittle}>Gestion de perfil</h1>
                        <h1 style={{ paddingBottom: '13px' }} className={styles.minimalistsubtitleWhite}>DATOS PERSONALES</h1>
                        <div className="w-full grid grid-cols-2 gap-4 mb-8">
                            <label className="block text-sm">
                                <span className="text-gray-700 dark:text-gray-400">Nombres</span>
                                <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400 py-1">
                                    <input
                                        className="block w-full pl-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                                        placeholder="Jane Doe" name="nombres" value={data.nombres} onChange={handleInputChange}
                                    />
                                    <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
                                        <div className="absolute" style={{ opacity: "0.7", backgroundSize: "cover", width: "20px", height: "20px", backgroundImage: `url("/images/icon_credentials_user.png")` }} />
                                    </div>
                                </div>
                            </label>

                            <label className="block text-sm">
                                <span className="text-gray-700 dark:text-gray-400">Apellidos</span>
                                <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400 py-1">
                                    <input
                                        className="block w-full pl-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                                        placeholder="Smith Jhonson" name="apellidos" value={data.apellidos} onChange={handleInputChange}
                                    />
                                    <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
                                        <div className="absolute" style={{ opacity: "0.7", backgroundSize: "cover", width: "20px", height: "20px", backgroundImage: `url("/images/icon_credentials_user.png")` }} />
                                    </div>
                                </div>
                            </label>

                            <label className="block text-sm">
                                <span className="text-gray-700 dark:text-gray-400">Identificacion</span>
                                <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400 py-1">
                                    <input
                                        className="block w-full pl-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                                        placeholder="xxxxxxxxxx" name="identificacion" value={data.identificacion} onChange={handleInputChange}
                                    />
                                    <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
                                        <div className="absolute" style={{ opacity: "0.7", backgroundSize: "cover", width: "20px", height: "20px", backgroundImage: `url("/images/icon_id_card.png")` }} />
                                    </div>
                                </div>
                            </label>

                            <label className="block text-sm">
                                <span className="text-gray-700 dark:text-gray-400">Direccion</span>
                                <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400 py-1">
                                    <input
                                        className="block w-full pl-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                                        placeholder="Tu direccion" name="direccion" value={data.direccion} onChange={handleInputChange}
                                    />
                                    <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
                                        <div className="absolute" style={{ opacity: "0.7", backgroundSize: "cover", width: "20px", height: "20px", backgroundImage: `url("/images/icon_direccion.png")` }} />
                                    </div>
                                </div>
                            </label>

                            <label className="block text-sm">
                                <span className="text-gray-700 dark:text-gray-400">Telefono</span>
                                <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400 py-1">
                                    <input
                                        className="block w-full pl-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                                        placeholder="09xxxxxxxx" name="telefono" value={data.telefono} onChange={handleInputChange}
                                    />
                                    <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
                                        <div className="absolute" style={{ opacity: "0.7", backgroundSize: "cover", width: "20px", height: "20px", backgroundImage: `url("/images/icon_phone.png")` }} />
                                    </div>
                                </div>
                            </label>

                        </div>

                        <h1 style={{ paddingBottom: '13px' }} className={styles.minimalistsubtitleWhite}>DATOS DE CUENTA</h1>
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <label className="block text-sm">
                                <span className="text-gray-700 dark:text-gray-400">Correo</span>
                                <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400 py-1">
                                    <input
                                        className="block w-full pl-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                                        placeholder="example@example.com" name="correo" value={data.cuenta.correo} onChange={handleInputChange}
                                    />
                                    <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
                                        <div className="absolute" style={{ opacity: "0.7", backgroundSize: "cover", width: "20px", height: "20px", backgroundImage: `url("/images/icon_email.png")` }} />
                                    </div>
                                </div>
                            </label>

                            <label className="block text-sm">
                                <span className="text-gray-700 dark:text-gray-400">Contraseña</span>
                                <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400 py-1">
                                    <input
                                        className="block w-full pl-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                                        placeholder="******"
                                        type='password' name="clave" onChange={handleInputChange}
                                    />
                                    <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
                                        <div className="absolute" style={{ opacity: "0.7", backgroundSize: "cover", width: "20px", height: "20px", backgroundImage: `url("/images/icon_show_password.png")` }} />
                                    </div>
                                </div>
                            </label>
                            <button
                                className="flex items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple w-fit"
                                type="submit"
                            >
                                <div className="mr-2" style={{ opacity: "0.7", backgroundSize: "cover", width: "17px", height: "17px", backgroundImage: `url("/images/icon_show_password.png")` }} />

                                <span className=''>Actualizar Cuenta</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AuthRoute>

    )
}