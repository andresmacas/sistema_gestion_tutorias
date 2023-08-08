package sgTutorias.rest;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.method.P;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import sgTutorias.controladores.PersonaRepository;
import sgTutorias.controladores.RegistroRepository;
import sgTutorias.controladores.TutoriasRepository;
import sgTutorias.modelo.Persona;
import sgTutorias.modelo.RegistroTutorias;
import sgTutorias.modelo.Tutorias;
import sgTutorias.rest.modelo_rest.TutoriasWS;
import sgTutorias.rest.respuesta.RespuestaLista;

@RestController
@RequestMapping(value = "/api/v1")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = { RequestMethod.GET, RequestMethod.POST,
        RequestMethod.HEAD })

public class TutoriasController {
    @Autowired
    private TutoriasRepository tutoriasRepository;
    @Autowired
    private RegistroRepository registroRepository;
    @Autowired
    private PersonaRepository personaRepository;

    @PostMapping("/tutorias/guardar")
    public ResponseEntity guardar(@Valid @RequestBody TutoriasWS tutoriasWS) {
        HashMap mapa = new HashMap<>();
        // Buscar al estudiante por su external_id en la base de datos
        Persona usuarioActual = personaRepository.findByExternal_id(tutoriasWS.getEstudiante().getExternal_id());

        if (usuarioActual != null) {
            Tutorias tutorias = tutoriasWS.cargarObjeto(null);
            RegistroTutorias r = registroRepository.findByExternal_id(tutoriasWS.getExternal_registroTutorias());

            if (r != null) {
                tutorias.setEstudiante(usuarioActual);
                tutorias.setCreateAt(new Date());
                tutorias.setRegistroTutorias(r);
                tutorias.setFechaSolicitada(tutoriasWS.getFechaSolicitada());
                tutorias.setHoras(tutoriasWS.getHoras());
                tutorias.setModalidad(tutoriasWS.getModalidad());
                tutorias.setTema(tutoriasWS.getTema());
                tutorias.setFechaAceptada(tutoriasWS.getFechaAceptada());
                tutorias.setEstado(tutoriasWS.getEstado());
                tutorias.setUpdateAt(new Date());
                tutoriasRepository.save(tutorias);
                mapa.put("evento", "Se ha registrado correctamente");
                return RespuestaLista.respuesta(mapa, "OK");
            } else {
                mapa.put("evento", "Objeto no encontrado");
                return RespuestaLista.respuestaError(mapa,
                        "No se encontro el registro tutoria deseado");
            }
        } else {
            mapa.put("evento", "Estudiante no encontrado");
            return RespuestaLista.respuestaError(mapa, "No se encontro el estudiante deseado");
        }
    }

    @GetMapping("/tutorias")
    public ResponseEntity listar() {
        List<Tutorias> lista = new ArrayList<>();
        List mapa = new ArrayList<>();
        tutoriasRepository.findAll().forEach((t) -> lista.add(t));
        HashMap aux = new HashMap<>();
        for (Tutorias t : lista) {
            aux.put("estado", t.getEstado());
            aux.put("external_id", t.getExternal_id());
            aux.put("external_registroTutorias", t.getRegistroTutorias().getExternal_id());
            aux.put("horas", t.getHoras());
            aux.put("fecha_solicitada", t.getFechaSolicitada());
            aux.put("modalidad", t.getModalidad());
            aux.put("tema", t.getTema());
            aux.put("fecha_aceptada", t.getFechaAceptada());
            aux.put("createAt", t.getCreateAt());
            aux.put("updateAt", t.getUpdateAt());
            if (t.getEstudiante() != null) {
                aux.put("estudiante_external_id", t.getEstudiante().getExternal_id());
                aux.put("estudiante_nombre", t.getEstudiante().getNombres()); // O cualquier otro atributo
                aux.put("estudiante_apellido", t.getEstudiante().getApellidos()); 
            }

            mapa.add(aux);

        }
        return RespuestaLista.respuesta(mapa, "Ok");

    }

    @GetMapping("/tutorias/{externalId}")
public ResponseEntity obtenerTutoriaPorExternalId(@PathVariable String externalId) {
    Tutorias tutoria = tutoriasRepository.findByExternal_id(externalId);

    if (tutoria != null) {
        HashMap<String, Object> tutoriaMap = new HashMap<>();
        
        tutoriaMap.put("estado", tutoria.getEstado());
        tutoriaMap.put("external_id", tutoria.getExternal_id());
        tutoriaMap.put("external_registroTutorias", tutoria.getRegistroTutorias().getExternal_id());
        tutoriaMap.put("horas", tutoria.getHoras());
        tutoriaMap.put("fecha_solicitada", tutoria.getFechaSolicitada());
        tutoriaMap.put("modalidad", tutoria.getModalidad());
        tutoriaMap.put("tema", tutoria.getTema());
        tutoriaMap.put("fecha_aceptada", tutoria.getFechaAceptada());
        tutoriaMap.put("createAt", tutoria.getCreateAt());
        tutoriaMap.put("updateAt", tutoria.getUpdateAt());
        
        if (tutoria.getEstudiante() != null) {
            tutoriaMap.put("estudiante_external_id", tutoria.getEstudiante().getExternal_id());
            tutoriaMap.put("estudiante_nombre", tutoria.getEstudiante().getNombres()); // O cualquier otro atributo
            tutoriaMap.put("estudiante_apellido", tutoria.getEstudiante().getApellidos()); // O cualquier otro atributo
        }
        
        return RespuestaLista.respuesta(tutoriaMap, "Ok");
    } else {
        HashMap<String, String> errorMap = new HashMap<>();
        errorMap.put("evento", "Tutoría no encontrada");
        return RespuestaLista.respuestaError(errorMap, "No se encontró la tutoría con el external_id proporcionado");
    }
}
@PutMapping("/tutorias/{externalId}")
public ResponseEntity editarTutoriaPorExternalId(
        @PathVariable String externalId,
        @Valid @RequestBody TutoriasWS tutoriasWS) {
    Tutorias tutoria = tutoriasRepository.findByExternal_id(externalId);

    if (tutoria != null) {
        // Actualizar los atributos de la tutoría con los valores del objeto tutoriasWS
        tutoria.setFechaSolicitada(tutoriasWS.getFechaSolicitada());
        tutoria.setHoras(tutoriasWS.getHoras());
        tutoria.setModalidad(tutoriasWS.getModalidad());
        tutoria.setTema(tutoriasWS.getTema());
        tutoria.setFechaAceptada(tutoriasWS.getFechaAceptada());
        tutoria.setEstado(tutoriasWS.getEstado());
        tutoria.setUpdateAt(new Date());

        tutoriasRepository.save(tutoria);

        HashMap<String, String> respuestaMap = new HashMap<>();
        respuestaMap.put("evento", "Tutoría actualizada correctamente");
        return RespuestaLista.respuesta(respuestaMap, "Ok");
    } else {
        HashMap<String, String> errorMap = new HashMap<>();
        errorMap.put("evento", "Tutoría no encontrada");
        return RespuestaLista.respuestaError(errorMap, "No se encontró la tutoría con el external_id proporcionado");
    }
}


}
