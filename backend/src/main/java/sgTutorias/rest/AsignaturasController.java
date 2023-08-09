package sgTutorias.rest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import sgTutorias.controladores.AsignaturaRepository;
import sgTutorias.modelo.Asignatura;
import sgTutorias.rest.respuesta.RespuestaLista;

/**
 * 
 */
@RestController
@RequestMapping(value = "/api/v1")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = { RequestMethod.GET, RequestMethod.POST,
        RequestMethod.HEAD })

public class AsignaturasController {

    @Autowired
    private AsignaturaRepository asignaturaRepository;

    @GetMapping("/asignaturas")
    public ResponseEntity listar() {
        List<Asignatura> lista = new ArrayList<>();
        List mapa = new ArrayList<>();
        asignaturaRepository.findAll().forEach((p) -> lista.add(p));
        Integer constante = 0;
        for (Asignatura p : lista) {
            constante++;
            HashMap aux = new HashMap<>();
            aux.put("asignatura", p.getAsignatura());
            // aux.put("periodo", p.getRegistroTutorias().getPeriodo());
            // aux.put("paralelo", p.getRegistroTutorias().getParalelo());
            aux.put("carrera", p.getCarrera());
            aux.put("facultad", p.getFacultad());
            aux.put("ciclo", p.getCiclo());
            aux.put("external_asignatura", p.getExternal_id());

            // aux.put("fechaEmision", p.getRegistroTutorias().getFechaEmision());
            // aux.put("external_persona",
            // p.getRegistroTutorias().getPersona().getExternal_id());
            // aux.put("nombre_persona", p.getRegistroTutorias().getPersona().getNombres());
            // aux.put("identificacion_persona",
            // p.getRegistroTutorias().getPersona().getIdentificacion());
            // aux.put("rol_persona", p.getRegistroTutorias().getPersona().getRol());
            mapa.add(aux);
        }
        return RespuestaLista.respuestaLista(mapa);
    }

}
