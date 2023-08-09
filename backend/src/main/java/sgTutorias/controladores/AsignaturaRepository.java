package sgTutorias.controladores;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import sgTutorias.modelo.Asignatura;

public interface AsignaturaRepository extends CrudRepository<Asignatura, Integer> {
    @Query("SELECT c from Asignatura c WHERE c.external_id = ?1")
    Asignatura findByExternal_id(String external_id);
}
