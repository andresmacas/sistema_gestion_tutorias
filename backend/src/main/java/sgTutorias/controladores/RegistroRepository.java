package sgTutorias.controladores;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import sgTutorias.modelo.RegistroTutorias;

public interface RegistroRepository extends CrudRepository<RegistroTutorias, Integer> {

    // @Query("SELECT r FROM RegistroTutorias r WHERE r.asignatura = ?1")
    // List<RegistroTutorias> findByAsignatura(String asignatura);
    @Query("SELECT r FROM RegistroTutorias r WHERE r.external_id = ?1")
    RegistroTutorias findByExternal_id(String external_id);

}