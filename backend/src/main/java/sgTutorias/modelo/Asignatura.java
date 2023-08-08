package sgTutorias.modelo;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

@Entity
@Table(name = "asignatura")
public class Asignatura implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Column(length = 200)
    private String asignatura;
    @Column(length = 200)
    private String carrera;
    @Column(length = 200)
    private String facultad;
    private Integer ciclo;
    @Column(length = 36)
    private String external_id;
    @CreatedDate
    @Column(name = "create_at", updatable = false, columnDefinition = "datetime default now()")
    private Date createAt;
    @LastModifiedDate
    @Column(name = "update_at", columnDefinition = "datetime default now()")
    private Date updateAt;
    @OneToOne(cascade = CascadeType.REFRESH)
    private RegistroTutorias registroTutorias;
}
