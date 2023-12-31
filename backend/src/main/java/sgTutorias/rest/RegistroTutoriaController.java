package sgTutorias.rest;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import sgTutorias.controladores.PersonaRepository;
import sgTutorias.controladores.RegistroRepository;
import sgTutorias.controladores.utiles.Utilidades;
import sgTutorias.modelo.Cuenta;
import sgTutorias.modelo.Persona;
import sgTutorias.modelo.RegistroTutorias;
import sgTutorias.modelo.Rol;
import sgTutorias.rest.modelo_rest.PersonaWS;
import sgTutorias.rest.modelo_rest.RegistroTutoriasWS;
import sgTutorias.rest.respuesta.RespuestaLista;

@RestController
@RequestMapping(value = "/api/v1")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = { RequestMethod.GET, RequestMethod.POST,
        RequestMethod.HEAD })

public class RegistroTutoriaController {
    @Autowired
    private PersonaRepository personaRepository;
    @Autowired
    private RegistroRepository registroRepository;

    @PostMapping("/registro/tutorias/guardar")
    public ResponseEntity guardarEquipo(@Valid @RequestBody RegistroTutoriasWS registroTutoriasWS) {
        HashMap mapa = new HashMap<>();
        RegistroTutorias registroTutorias = new RegistroTutorias();
        Persona p = personaRepository.findByExternal_id(registroTutoriasWS.getExternal_persona());
        if (p != null) {
            // registroTutoriasWS.cargarObjeto(registroTutorias);
            registroTutorias.setCreated_at(new Date());
            registroTutorias.setPersona(p);
            registroTutorias.setAsignatura(registroTutoriasWS.getAsignatura());
            registroTutorias.setPeriodo(registroTutoriasWS.getPeriodo());
            registroTutorias.setParalelo(registroTutoriasWS.getParalelo());
            registroTutorias.setCarrera(registroTutoriasWS.getCarrera());
            registroTutorias.setFacultad(registroTutoriasWS.getFacultad());
            registroTutorias.setFechaEmision(new Date());
            registroTutorias.setExternal_id(UUID.randomUUID().toString());
            registroRepository.save(registroTutorias);
            mapa.put("evento", "Se ha registrado correctamente");
            return RespuestaLista.respuesta(mapa, "OK");
        } else {
            mapa.put("evento", "Objeto no encontrado");
            return RespuestaLista.respuestaError(mapa,
                    "No se encontro el registro tutoria deseado");
        }
    }

    @GetMapping("/registro/tutorias")
    public ResponseEntity listar() {
        List<RegistroTutorias> lista = new ArrayList<>();
        List mapa = new ArrayList<>();
        registroRepository.findAll().forEach((r) -> lista.add(r));
        // Integer constante = 0;
        HashMap aux = new HashMap<>();
        for (RegistroTutorias r : lista) {
            // constante++;

            aux.put("asignatura", r.getAsignatura());
            aux.put("carrera", r.getCarrera());
           // aux.put("external_id", r.getExternal_id());
            aux.put("facultad", r.getFacultad());
            aux.put("paralelo", r.getParalelo());
            aux.put("periodo", r.getPeriodo());
            aux.put("tutor_apellido", r.getPersona().getApellidos());
            aux.put("tutor_nombre", r.getPersona().getNombres());
            aux.put("tutor_nombre", r.getPersona().getNombres());
            aux.put("tutor_identificacion", r.getPersona().getIdentificacion());
           // aux.put("tutorias", r.getTutorias().;
            aux.put("external_registro",r.getExternal_id());
            // aux.put("tutorias", r.getTutorias());
            mapa.add(aux);
        }
        return RespuestaLista.respuestaLista(mapa);
    }

    @GetMapping("/registro/tutorias/{external}")
    public ResponseEntity obtener(@PathVariable String external) {
        RegistroTutorias r = registroRepository.findByExternal_id(external);
        if (r != null) {
            HashMap aux = new HashMap<>();
            aux.put("asignatura", r.getAsignatura());
            aux.put("carrera", r.getCarrera());
            aux.put("external_id", r.getExternal_id());
            aux.put("facultad", r.getFacultad());
            aux.put("paralelo", r.getParalelo());
            aux.put("periodo", r.getPeriodo());
            aux.put("tutor_apellido", r.getPersona().getApellidos());
            aux.put("tutor_nombre", r.getPersona().getNombres());
            aux.put("tutor_nombre", r.getPersona().getNombres());
            aux.put("tutor_identificacion", r.getPersona().getIdentificacion());
            aux.put("tutorias", r.getTutorias().toArray());
            return RespuestaLista.respuestaLista(aux);
        } else {
            HashMap mapa = new HashMap<>();
            mapa.put("evento", "Objeto no encontrado");
            return RespuestaLista.respuestaError(mapa, "No se encontro el onjeto desaeado");
        }
    }

    @PostMapping("/registro/tutorias/editar/{external}")
    public ResponseEntity guardarEquipo(@Valid @PathVariable String external, @RequestBody RegistroTutoriasWS registroTutoriasWS) {
        HashMap mapa = new HashMap<>();
        RegistroTutorias registroTutorias = registroRepository.findByExternal_id(external);
        Persona p = personaRepository.findByExternal_id(registroTutoriasWS.getPersona().getExternal_id());
        System.out.println(registroTutoriasWS.getPersona().getExternal_id());
        System.out.println("/////////////////////////////////////////////////////////");

        if (p != null) {
            // registroTutoriasWS.cargarObjeto(registroTutorias);
            
            registroTutorias.setPersona(p);
            registroTutorias.setAsignatura(registroTutoriasWS.getAsignatura());
            registroTutorias.setPeriodo(registroTutoriasWS.getPeriodo());
            registroTutorias.setParalelo(registroTutoriasWS.getParalelo());
            registroTutorias.setCarrera(registroTutoriasWS.getCarrera());
            registroTutorias.setFacultad(registroTutoriasWS.getFacultad());
            registroTutorias.setFechaEmision(new Date());
            registroTutorias.setExternal_id(UUID.randomUUID().toString());
            registroRepository.save(registroTutorias);
            mapa.put("evento", "Se ha Modificado correctamente");
            return RespuestaLista.respuesta(mapa, "OK");
        } else {
            mapa.put("evento", "Objeto no encontrado");
            return RespuestaLista.respuestaError(mapa,
                    "No se encontro el registro tutoria deseado");
        }

    }

}
