INSERT INTO
    rol (id, descripcion, nombre)
VALUES
    (
        1,
        'Descripción del rol de estudiante',
        'estudiante'
    ),
    (2, 'Descripción del rol de docente', 'docente'),
    (3, 'Descripción del rol de admin', 'admin'),
    (4, 'Descripción del rol de gestor', 'gestor');

INSERT INTO
    asignatura (
        id,
        asignatura,
        carrera,
        facultad,
        ciclo,
        external_id
    )
VALUES
    (
        1,
        'Sistemas Operativos',
        'Computación',
        'Area de la industria y los Recursos No Renovables',
        2,
        UUID()
    ),
    (
        2,
        'Cloud Computing',
        'Computación',
        'Area de la industria y los Recursos No Renovables',
        2,
        UUID()
    ),
    (
        3,
        'Procesos de Software',
        'Computación',
        'Area de la industria y los Recursos No Renovables',
        2,
        UUID()
    ),
    (
        4,
        'Fundamentos de Redes',
        'Computación',
        'Area de la industria y los Recursos No Renovables',
        2,
        UUID()
    ),
    (
        5,
        'Gestión de Redes',
        'Computación',
        'Area de la industria y los Recursos No Renovables',
        2,
        UUID()
    ),
    (
        6,
        'Sistemas Distribuidos',
        'Computación',
        'Area de la industria y los Recursos No Renovables',
        2,
        UUID()
    );