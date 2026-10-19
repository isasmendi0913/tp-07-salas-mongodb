# Trabajo práctico 07

## Punto de partida y nombre de la copia

Este trabajo parte de una copia funcional del TP06 (`tp-06-salas-modular`). La copia se llama `tp-07-salas-mongodb` y conserva el sitio Express en memoria, agregando un laboratorio de persistencia con MongoDB Atlas.

## Versiones utilizadas

- Node.js 22.13 o superior
- Express 5.1.0
- EJS 3.1.10
- express-ejs-layouts 2.5.1
- Mongoose 9.10.3
- Morgan 1.10.0

Base de datos: **MongoDB Atlas Free (M0)**, base `reservas_salas_u7`, colección `reservas`.

## Instalación y ejecución

```bash
npm install
npm install mongoose@9.10.3 --save-exact
node --env-file=.env scripts/comprobar-conexion.js
npm start

Diagnóstico DNS Se configuró la línea dns.setServers(["8.8.8.8", "1.1.1.1"]) en src/config/base-datos.js para evitar fallos de resolución (como querySrv ECONNREFUSED) al intentar conectar con los servidores de Atlas desde ciertas redes.

Comandos

Comando                             	                    Descripción                                             
node --env-file=.env scripts/comprobar-conexion.js      	Prueba la conexión
##   Conexión con MongoDB establecida.
node --env-file=.env scripts/crear-reserva.js	            Crea una reserva
##   Reserva guardada. _id: 6ad63f0399f18f6338cfcd96
node --env-file=.env scripts/listar-reservas.js	            Lista todas las reservas
┌─────────┬────────────────────────────┬────────────────┬──────────────┬──────────────┬──────────┬──────────┐
│ (index) │ id                         │ estudiante     │ sala         │ fecha        │ turno    │ personas │
├─────────┼────────────────────────────┼────────────────┼──────────────┼──────────────┼──────────┼──────────┤
│ 0       │ '6ad59feb55b78016e21bec83' │ 'Ana Martínez' │ 'Sala Norte' │ '2026-10-20' │ 'Mañana' │ 2        │
│ 1       │ '6ad63f0399f18f6338cfcd96' │ 'Ana Martínez' │ 'Sala Norte' │ '2026-10-20' │ 'Mañana' │ 2        │
└─────────┴────────────────────────────┴────────────────┴──────────────┴──────────────┴──────────┴──────────┘
npm run format	                                            Formatea src y scripts
## src/config/entorno.js 40ms
## src/controladores/reservas.js 42ms (unchanged)
## src/index.js 31ms
## src/middleware/reservas.js 31ms (unchanged)
## src/middleware/solicitudes.js 16ms (unchanged)
## src/modelos/reserva.js 14ms
## src/rutas/reservas.js 21ms (unchanged)
## src/servicios/reservas.js 25ms
## scripts/comprobar-conexion.js 21ms
## scripts/crear-reserva.js 13ms
## scripts/listar-reservas.js 36ms
npm run check	                                            Verifica formato y lint
npm start	                                                Arranca el sitio web

Mapa de archivos
Archivo	                                Responsabilidad
src/config/entorno.js	        Lee PORT, NODE_ENV, MONGODB_URI
src/config/base-datos.js	    Conecta y desconecta MongoDB
src/modelos/reserva.js	        Schema y modelo de reserva
scripts/comprobar-conexion.js	Prueba la conexión
scripts/crear-reserva.js	    Crea una reserva
scripts/listar-reservas.js	    Lista reservas

Esquema, modelo y colección
Schema: define campos, tipos y reglas de validación.

Modelo: Reserva (nombre en Node.js), ofrece create y find.

Colección: reservas (nombre en MongoDB), conserva los documentos.

Campos y reglas
Campo	        Tipo	    Regla
estudiante	    String	    Obligatorio, trim
email	        String	    Obligatorio, trim, contiene @
sala	        String	    Obligatorio, enum: Sala Norte, Sala Sur, Sala Multimedia
fecha	        String	    Obligatorio, trim
turno	        String	    Obligatorio, enum: Mañana, Tarde, Noche
personas	    Number	    Obligatorio, entero entre 1 y 6


Matriz de pruebas
Caso	                        Resultado
Conexión                válida	Confirmación, proceso terminado
Variable                vacía	Fallo de configuración
Contraseña              incorrecta	Fallo de autenticación
Reserva                 válida	Se guarda, devuelve _id
Consulta                en proceso nuevo	Recupera el _id
Segunda                 consulta	Cantidad sin cambios
Estudiante              vacío	Rechazo
Email                   sin @	Rechazo
Sala                    no permitida	Rechazo
Turno                   no permitido	Rechazo
Fecha                   vacía	Rechazo
Personas                0, 7, 2.5	Rechazo
Personas                "abc"	Rechazo de conversión
Evidencia               de persistencia

## Evidencia de persistencia

1. Se ejecutó el script de creación tres veces.
2. El listado mostró tres documentos idénticos en datos, pero con `_id` distintos:
   - `6ad59feb55b78016e21bec83`
   - `6ad63f0399f18f6338cfcd96`
   - `6ad640a132558085da5512ff`
3. Esto demuestra que los datos persisten en MongoDB Atlas (sobreviven al cierre del proceso) y que, al no haber índices únicos, cada ejecución inserta un nuevo documento.
