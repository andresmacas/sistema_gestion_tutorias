package sgTutorias;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.jdbc.core.JdbcTemplate;
import java.util.UUID;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public void run(String... args) throws Exception {
        initializeRoles();
        initializeAsignaturas();
    }

    private void initializeRoles() {
        insertRoleIfNotExists("Descripción del rol de estudiante", "estudiante");
        insertRoleIfNotExists("Descripción del rol de docente", "docente");
        insertRoleIfNotExists("Descripción del rol de admin", "admin");
        insertRoleIfNotExists("Descripción del rol de gestor", "gestor");
    }

    private void insertRoleIfNotExists(String descripcion, String nombre) {
        if (!roleExists(nombre)) {
            jdbcTemplate.update(
                    "INSERT INTO rol (descripcion, nombre) VALUES (?, ?)",
                    descripcion, nombre);
        }
    }

    private boolean roleExists(String nombre) {
        Integer count = jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM rol WHERE nombre = ?", Integer.class, nombre);
        return count != null && count > 0;
    }

    private void initializeAsignaturas() {
        insertAsignaturaIfNotExists("Sistemas Operativos", "Computación",
                "Area de la industria y los Recursos No Renovables", 2);
        insertAsignaturaIfNotExists("Cloud Computing", "Computación",
                "Area de la industria y los Recursos No Renovables", 2);
        insertAsignaturaIfNotExists("Sistemas Distribuidos", "Computación",
                "Area de la industria y los Recursos No Renovables", 6);
        insertAsignaturaIfNotExists("Procesos de Software", "Computación",
                "Area de la industria y los Recursos No Renovables", 6);
        insertAsignaturaIfNotExists("Gestión de Redes y Comunicaciones", "Computación",
                "Area de la industria y los Recursos No Renovables", 6);
        insertAsignaturaIfNotExists("Teoría de Autómatas", "Computación",
                "Area de la industria y los Recursos No Renovables", 6);
    }

    private void insertAsignaturaIfNotExists(String asignatura, String carrera, String facultad, int ciclo) {
        if (!asignaturaExists(asignatura)) {
            jdbcTemplate.update(
                    "INSERT INTO asignatura (asignatura, carrera, facultad, ciclo, external_id) VALUES (?, ?, ?, ?, ?)",
                    asignatura, carrera, facultad, ciclo, UUID.randomUUID().toString());
        }
    }

    private boolean asignaturaExists(String asignatura) {
        Integer count = jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM asignatura WHERE asignatura = ?", Integer.class, asignatura);
        return count != null && count > 0;
    }
}
