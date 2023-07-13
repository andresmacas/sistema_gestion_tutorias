import SideNavBar from "@/components/SideNavBar";
import styles from '../styles/Home.module.css';
export default function Tutorias() {
    return (
        <div className="flex" style={{ backgroundColor: '#f6f6f6' }}>
            <SideNavBar />
            <div className={styles.container}>
                <h1 className={styles.tittle}>Tutorias</h1>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.th}>#</th>
                            <th  className={styles.th}>Asignatura</th>
                            <th  className={styles.th}>Descripcion</th>
                            <th  className={styles.th}>Estado</th>
                            <th  className={styles.th}>Editar</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tr}>
                        <tr>
                            <td>1</td>
                            <td>Diseño de software</td>
                            <td>Tutoria para preparacion de examen</td>
                            <td>Finalizado</td>
                            <td>boton</td>
                        </tr>
                        <tr>
                            <td>Dato 4</td>
                            <td>Dato 5</td>
                            <td>Dato 6</td>
                            <td>Dato 3</td>
                            <td>Dato 3</td>

                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
