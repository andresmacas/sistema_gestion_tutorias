import Head from 'next/head';
import bg from '../public/images/login_background.jpg';
import styles from '../styles/Login.module.css'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { registro } from './api/api';
export default function Register() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        apellidos: '',
        nombres: '',
        identificacion: '',
        direccion: '',
        telefono: '',
        tipo_persona: 'estudiante',
        cuenta: {
            correo: '',
            clave: '',
        },
    });




    const handleRegister = async () => {
        try {
            // Realizar el registro enviando los datos de formData al backend
            // Por ejemplo, usando una función de registro en la API
            const response = await registerUser(formData);

            // Obtener el token de la respuesta del backend
            setUserData({
                ...formData,
            });

            // Redirigir al usuario a la página de inicio después del registro exitoso
            router.push('/home');
        } catch (error) {
            // Manejar errores de registro aquí
            console.error('Error al registrar el usuario:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formElement = document.getElementById('formData');
        // Crear un nuevo objeto FormData
        const campos = new window.FormData();
        for (const input of formElement.elements) {
            if (input.name) {
                campos.append(input.name, input.value);
            }
        }
        console.log(campos)
        try {
            registro(formData).then((response) => {
                console.log(response.data); // Aquí puedes acceder a los datos de la respuesta
                if (response.data.code == "200 OK") {
                    router.push('/login');
                }
            }).catch((error) => {
                console.error('Error al registrar:', error);
            });
        } catch (error) {
            console.error('Error al registrar:', error);
        }
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
        <form id="formData" name="formData" onSubmit={handleSubmit}>
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
                        <input id='nombres' className={styles.input} style={{ width: '160px', marginRight: '10px' }} type="text" name="nombres" />
                        <span className={styles.spandouble}>Nombres</span>
                        <div className={styles.iconDouble} style={{ backgroundImage: `url("/images/icon_credentials_user.png")` }} />

                        <input className={styles.input} style={{ width: '160px' }} type="text" name="apellidos" id="last-name" />
                        <spanDouble>Apellidos</spanDouble>
                        <div className={styles.icon} style={{ backgroundImage: `url("/images/icon_credentials_user.png")` }} />
                    </div>
                    <div className={styles.inputContainer}>
                        <input className={styles.input} style={{ width: '330px' }} type="text" name="correo" />
                        <span>Email</span>
                        <div className={styles.icon} style={{ backgroundImage: `url("/images/icon_email.png")` }} />
                    </div>

                    <div className={styles.inputContainer}>
                        <input className={styles.input} style={{ width: '330px' }} type="text" name="identificacion" />
                        <span>Identificacion</span>
                        <div className={styles.icon} style={{ backgroundImage: `url("/images/icon_id_card.png")` }} />
                    </div>

                    <div className={styles.inputContainer}>
                        <input className={styles.input} style={{ width: '160px', marginRight: '10px' }} type="text" name="direccion" id="direccion" />
                        <span className={styles.spandouble}>Direccion</span>
                        <div className={styles.iconDouble} style={{ backgroundImage: `url("/images/icon_direccion.png")` }} />

                        <input className={styles.input} style={{ width: '160px' }} type="text" name="telefono" id="telefono" />
                        <spanDouble>Telefono</spanDouble>
                        <div className={styles.icon} style={{ backgroundImage: `url("/images/icon_phone.png")` }} />
                    </div>


                    <div className={styles.inputContainer} >
                        <input className={styles.input} style={{ width: '330px' }} type="password" name="clave" id="clave" />
                        <span className={styles.span}>Contraseña</span>
                        <div className={styles.iconToggle} style={{ backgroundImage: `url(${showIcon})` }} onClick={handleTogglePassword} />
                    </div>
                    <button type='submit' className={styles.button} style={{ width: '330px' }}>Registrate</button>
                </div>
            </div>
        </form>
    )
}