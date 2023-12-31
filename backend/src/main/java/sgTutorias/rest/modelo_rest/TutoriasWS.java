package sgTutorias.rest.modelo_rest;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;
import sgTutorias.modelo.Persona;
import sgTutorias.modelo.Tutorias;

@Getter
@Setter
public class TutoriasWS {

    private Integer id;
    
    @NotBlank(message = "El tema de la tutoría es requerido.")
    @Size(max = 100, message = "El tema de la tutoría debe tener como máximo {max} caracteres.")
    private String tema;
    
    @NotNull(message = "La fecha solicitada es requerida.")
    private Date fechaSolicitada;
    
    private Date fechaAceptada;
    
    //@NotNull(message = "El estado de la tutoría es requerido.")
    private Boolean estado;
    
    //@NotNull(message = "El número de horas es requerido.")
    private Double horas;
    
    private String external_id;
    
    //@NotNull(message = "El registro de tutoría es requerido.")
    //private RegistroTutoriasWS registroTutoria;
    
    @NotBlank(message = "La modalidad de la tutoría es requerida.")
    @Size(max = 50)
    private String modalidad;

    @NotBlank(message = "Campo de Registro Tutorias es requerido")
    private String external_registroTutorias;
    // Lista de estudiantes asociados a la tutoría (si es necesario)
    private List<PersonaWS> estudiantes;
    private Persona persona;
    private RegistroTutoriasWS registroTutoriasWS;

    
    public Tutorias cargarObjeto(Tutorias tutoria) {
        if (tutoria == null) {
            tutoria = new Tutorias();
        }
        tutoria.setTema(tema);
        tutoria.setFechaAceptada(fechaAceptada);
        tutoria.setFechaSolicitada(fechaSolicitada);
        tutoria.setEstado(estado);
        tutoria.setHoras(horas);
        tutoria.setModalidad(modalidad);
        tutoria.setExternal_id(UUID.randomUUID().toString());
        return tutoria;
    }
}
