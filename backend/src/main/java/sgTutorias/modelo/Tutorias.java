package sgTutorias.modelo;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;


import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
@Entity(name = "tutorias")
@Table(name = "tutorias")
public class Tutorias implements java.io.Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;//
    @Column(length = 100)
    private String tema;//
    @Column(length = 100)
    private String modalidad;//
    @Temporal(TemporalType.DATE)
    private Date fechaSolicitada;//
    //fecha inicio
    @Temporal(TemporalType.DATE)
    private Date fechaAceptada;  //
    @Column(length = 100)
    private String estado;///////////////
    private Double horas;///
    //estudiantess
    @ManyToOne(cascade = CascadeType.REFRESH)
    @JoinColumn(referencedColumnName = "id", name = "id_estudiante", nullable = false)
    private Persona estudiante;
    
    @Column(length = 36)
    private String external_id;
    @CreatedDate
    @Column(name = "create_at", updatable = false, columnDefinition = "datetime default now()")
    private Date createAt;
    @LastModifiedDate
    @Column(name = "update_at", columnDefinition = "datetime default now()")
    private Date updateAt;
    @ManyToOne(cascade = CascadeType.REFRESH)
    @JoinColumn(referencedColumnName = "id", name = "id_registroTutorias")
    private RegistroTutorias registroTutorias;
}
