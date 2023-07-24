package sgTutorias.rest;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.method.P;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import sgTutorias.controladores.RegistroRepository;
import sgTutorias.controladores.TutoriasRepository;
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

    @PostMapping("/tutorias/guardar")
    public ResponseEntity guardar(@Valid @RequestBody TutoriasWS tutoriasWS) { 
        HashMap mapa = new HashMap<>();
        Tutorias tutorias = new Tutorias();
        RegistroTutorias r = registroRepository.findByExternal_id(tutoriasWS.getExternal_registroTutorias());
        if (r != null) {
            tutorias.setCreateAt(new Date());
            tutorias.setRegistroTutorias(r);
            tutorias.setFechaSolicitada(tutoriasWS.getFechaSolicitada());
            //tutorias.setHoras(tutoriasWS.getHoras());
            tutorias.setModalidad(tutoriasWS.getModalidad());
            tutorias.setTema(tutoriasWS.getTema());
            //tutorias.setFechaAceptada(tutoriasWS.getFechaAceptada());
            tutorias.setEstado(tutoriasWS.getEstado());
            tutorias.setUpdateAt(new Date());
            tutoriasRepository.save(tutorias);
        
        mapa.put("evento", "Se ha registrado correctamente");
        return RespuestaLista.respuesta(mapa, "OK");
        }else {
            mapa.put("evento", "Objeto no encontrado");
            return RespuestaLista.respuestaError(mapa,
                    "No se encontro el registro tutoria deseado");
        }
    }

    @GetMapping("/tutorias")
    public ResponseEntity listar() {
        List<Tutorias> lista = new ArrayList<>();
        List mapa= new ArrayList<>();
        tutoriasRepository.findAll().forEach((t) -> lista.add(t));
        HashMap aux = new HashMap<>();
        for(Tutorias t : lista){
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
            

            mapa.add(aux);

        }
        return RespuestaLista.respuesta(mapa, "Ok");
        
    }



}


