# Examen Final - Sistema de Reservas de Hoteles

## Descripción
Este repositorio contiene los **tests automatizados** para evaluar tu microservicio.
Debes crear un backend que pase todos los tests.

---

## Instrucciones para el estudiante

### 1. Clonar este repositorio
```bash
git clone https://github.com/PROFESOR/hotel-booking-tests.git
cd hotel-booking-tests
2. Crear tu microservicio
Debes crear una carpeta llamada backend-microservicio/ con tu código.
3. Endpoints requeridos
Hoteles
MétodoRutaDescripción
GET/hotelesListar todos los hoteles
GET/hoteles/:idObtener un hotel por ID
POST/hotelesCrear un hotel

Export as CSV
Habitaciones
MétodoRutaDescripción
GET/habitacionesListar todas las habitaciones
GET/habitaciones/:idObtener una habitación por ID
GET/hoteles/:id/habitacionesListar habitaciones de un hotel
POST/habitacionesCrear una habitación

Export as CSV
Huéspedes
MétodoRutaDescripción
GET/huespedesListar todos los huéspedes
GET/huespedes/:idObtener un huésped por ID
POST/huespedesCrear un huésped

Export as CSV
Reservas
MétodoRutaDescripción
GET/reservasListar todas las reservas
GET/reservas/:idObtener una reserva por ID
POST/reservasCrear una reserva
PUT/reservas/:id/cancelarCancelar una reserva

Export as CSV
4. Estructura de datos esperada
Hotel
json


{
  "id": "uuid",
  "nombre": "string",
  "direccion": "string",
  "ciudad": "string",
  "estrellas": number
}
Habitación
json


{
  "id": "uuid",
  "hotel_id": "uuid",
  "numero": "string",
  "tipo": "string (simple/doble/suite)",
  "precio_noche": number,
  "disponible": boolean
}
Huésped
json


{
  "id": "uuid",
  "nombre": "string",
  "email": "string",
  "telefono": "string",
  "documento": "string"
}
Reserva
json


{
  "id": "uuid",
  "habitacion_id": "uuid",
  "huesped_id": "uuid",
  "fecha_entrada": "date",
  "fecha_salida": "date",
  "precio_total": number,
  "estado": "string (pendiente/confirmada/cancelada)"
}
5. Ejecutar con Docker
bash


docker-compose up --build
6. Resultado esperado
Si tu microservicio está correcto, verás:
text


hotel-tests  | PASS  tests/hoteles.test.ts
hotel-tests  | PASS  tests/habitaciones.test.ts
hotel-tests  | PASS  tests/huespedes.test.ts
hotel-tests  | PASS  tests/reservas.test.ts
hotel-tests  | Tests:       16 passed, 16 total
Credenciales de la Base de Datos
VariableValor
DB_HOSTdatabase
DB_PORT3306
DB_USERroot
DB_PASSWORDpassword123
DB_NAMEhotel_db

Export as CSV
Criterios de evaluación
✅ Todos los tests de hoteles pasan
✅ Todos los tests de habitaciones pasan
✅ Todos los tests de huéspedes pasan
✅ Todos los tests de reservas pasan
✅ El backend se conecta correctamente a MySQL
