package sgTutorias.controladores;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import sgTutorias.modelo.Tutorias;

import java.util.List;

public interface TutoriasRepository extends CrudRepository<Tutorias, Integer> {
    @Query("SELECT t from tutorias t WHERE t.estado = ?1")
    List<Tutorias> findByEstado(Boolean estado);
    @Query("SELECT t from tutorias t WHERE t.external_id = ?1")
    Tutorias findByExternal_id(String externalId);

}