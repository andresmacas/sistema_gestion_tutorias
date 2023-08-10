import Head from 'next/head';
import bg from '../public/images/login_background.jpg';
import styles from '../styles/Login.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { registro } from './api/api';
import Swal from 'sweetalert2'

export default function Register() {
    const [password, setPassword] = useState('');
    const router = useRouter();
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

    const handleChange = (e) => {
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
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        registro(data).then((response) => {
            console.log(response);
            if (response.code != "200 OK") {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error al crear la cuenta!',
                  })
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Oops...',
                    text: 'Cuenta creada con exito!',
                  })
                router.push('/login');
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

    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePassword = () => {
        var tipo = document.getElementById("password");
        if (tipo.type == "password") {
            tipo.type = "text";
        } else {
            tipo.type = "password";
        }
        setShowPassword(!showPassword);
    };
    // Evalua showIcon, si es verdadero cambia la fuente de imagen de una hacia otra
    const showIcon = showPassword ? "/images/icon_hide_glow.png" : "/images/icon_show_password.png";

    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.container} style={{ backgroundImage: `url(${bg.src})`, height: '100vh', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                <Head>
                    <title>Registro</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <div className={styles.form}>
                    <h1 className={styles.minimalist}>SISTEMA DE GESTION DE TUTORIAS</h1>
                    <h1 className={styles.tittle}>
                        <span>Registrarse</span>
                        <span style={{ color: '#1c90f5' }}>.</span>
                    </h1>
                    <h1 style={{ paddingTop: '13px', paddingBottom: '13px' }} className={styles.minimalistsubtitle}>Ya tienes una cuenta?{' '}
                        <Link style={{ color: '#1e7fd6' }} href="/login" passHref>
                            Inicia Sesion
                        </Link>
                    </h1>
                    <div className={styles.inputContainer}>
                        <input name="nombres" value={data.nombres} onChange={handleChange} className={styles.input} style={{ width: '160px', marginRight: '10px' }} />
                        <span className={styles.spandouble}>Nombres</span>
                        <div className={styles.iconDouble} style={{ backgroundImage: `url("/images/icon_credentials_user.png")` }} />

                        <input value={data.apellidos} onChange={handleChange} className={styles.input} style={{ width: '160px' }} type="text" name="apellidos" id="last-name" />
                        <spanDouble>Apellidos</spanDouble>
                        <div className={styles.icon} style={{ backgroundImage: `url("/images/icon_credentials_user.png")` }} />
                    </div>
                    <div className={styles.inputContainer}>
                        <input value={data.cuenta.correo} onChange={handleChange} className={styles.input} style={{ width: '330px' }} type="text" name="correo" />
                        <span>Email</span>
                        <div className={styles.icon} style={{ backgroundImage: `url("/images/icon_email.png")` }} />
                    </div>

                    <div className={styles.inputContainer}>
                        <input value={data.identificacion} onChange={handleChange} className={styles.input} style={{ width: '330px' }} type="text" name="identificacion" />
                        <span>Identificacion</span>
                        <div className={styles.icon} style={{ backgroundImage: `url("/images/icon_id_card.png")` }} />
                    </div>

                    <div className={styles.inputContainer}>
                        <input value={data.direccion} onChange={handleChange} className={styles.input} style={{ width: '160px', marginRight: '10px' }} type="text" name="direccion" id="direccion" />
                        <span className={styles.spandouble}>Direccion</span>
                        <div className={styles.iconDouble} style={{ backgroundImage: `url("/images/icon_direccion.png")` }} />

                        <input value={data.telefono} onChange={handleChange} className={styles.input} style={{ width: '160px' }} type="text" name="telefono" id="telefono" />
                        <spanDouble>Telefono</spanDouble>
                        <div className={styles.icon} style={{ backgroundImage: `url("/images/icon_phone.png")` }} />
                    </div>


                    <div className={styles.inputContainer} >
                        <input type="password" name="clave" value={data.cuenta.clave} onChange={handleChange} className={styles.input} style={{ width: '330px' }} />
                        <span className={styles.span}>Contraseña</span>
                        <div className={styles.iconToggle} style={{ backgroundImage: `url(${showIcon})` }} onClick={handleTogglePassword} />
                    </div>
                    
                    
                    <button type="submit" className={styles.button} style={{ width: '330px' }}>Registrate</button>
                </div>
            </div>
        </form>
    )
}