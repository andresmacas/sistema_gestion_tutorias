import Head from 'next/head';
import bg from '../public/images/login_background.jpg';
import styles from '../styles/Login.module.css'
import Link from 'next/link';

import { useState } from 'react';
export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePassword = () => {
        var tipo = document.getElementById("password");
        var tipo2 = document.getElementById("password2");
        if (tipo.type == "password") {
            tipo.type = "text";
            tipo2.type = "text";
        } else {
            tipo2.type = "password";
            tipo.type = "password";
        }
        setShowPassword(!showPassword);
    };
    // Evalua showIcon, si es verdadero cambia la fuente de imagen de una hacia otra
    const showIcon = showPassword ? "/images/icon_hide_glow.png" : "/images/icon_show_password.png";

    return (
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
                    <Link style={{color:'#1e7fd6'}} href="/login" passHref>
                        Inicia Sesion
                    </Link>
                </h1>
                <div className={styles.inputContainer}>
                    <input className={styles.input} style={{ width: '160px', marginRight: '10px' }} type="text" name="firt-name" id="firt-name" />
                    <span className={styles.spandouble}>Nombres</span>
                    <div className={styles.iconDouble} style={{ backgroundImage: `url("/images/icon_credentials_user.png")` }} />

                    <input className={styles.input} style={{ width: '160px' }} type="text" name="last-name" id="last-name" />
                    <spanDouble>Apellidos</spanDouble>
                    <div className={styles.icon} style={{ backgroundImage: `url("/images/icon_credentials_user.png")` }} />
                </div>
                <div className={styles.inputContainer}>
                    <input className={styles.input} style={{ width: '330px' }} type="text" />
                    <span>Email</span>
                    <div className={styles.icon} style={{ backgroundImage: `url("/images/icon_email.png")` }} />
                </div>
                <div className={styles.inputContainer} >
                    <input className={styles.input} style={{ width: '330px' }} type="password" name="password" id="password" />
                    <span className={styles.span}>Contraseña</span>
                    <div className={styles.iconToggle} style={{ backgroundImage: `url(${showIcon})` }} onClick={handleTogglePassword} />
                </div>
                <div className={styles.inputContainer} >
                    <input className={styles.input} style={{ width: '330px' }} type="password" name="password2" id="password2" />
                    <span className={styles.span}>Repita su contraseña</span>
                    <div className={styles.iconToggle} style={{ backgroundImage: `url(${showIcon})` }} onClick={handleTogglePassword} />
                </div>
                <button className={styles.button} style={{ width: '330px' }}>Registrate</button>
            </div>
        </div>

    )
}