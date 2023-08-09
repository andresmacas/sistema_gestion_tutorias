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
import sgTutorias.modelo.RegistroTutorias;

@Getter
@Setter
public class RegistroTutoriasWS {

    private Integer id;

    @NotNull(message = "La fecha de emisión es requerida.")
    private Date fechaEmision;

    @NotBlank(message = "El periodo es requerido.")
    @Size(max = 70, message = "El periodo debe tener como máximo {max} caracteres.")
    private String periodo;

    @NotBlank(message = "El paralelo es requerido.")
    @Size(max = 70, message = "El paralelo debe tener como máximo {max} caracteres.")
    private String paralelo;

    private String external_persona;
    private String external_asignatura;
    private String external_id;
    private Persona persona;
    private PersonaWS personaWS;

    private List<TutoriasWS> tutorias;

    public RegistroTutorias cargarObjeto(RegistroTutorias registroTutorias) {
        if (registroTutorias == null) {
            registroTutorias = new RegistroTutorias();
        }
        registroTutorias.setFechaEmision(fechaEmision);
        registroTutorias.setPeriodo(periodo);
        registroTutorias.setParalelo(paralelo);
        registroTutorias.setExternal_id(UUID.randomUUID().toString());
        return registroTutorias;
    }
}
