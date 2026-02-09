import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:3000';

describe('API de Reservas', () => {
  
  let hotelId: string;
  let habitacionId: string;
  let huespedId: string;
  let reservaId: string;

  beforeAll(async () => {
    // Crear hotel
    const hotelResponse = await axios.post(`${API_URL}/hoteles`, {
      nombre: "Hotel Test Reservas",
      direccion: "Av. Reservas 789",
      ciudad: "Cuenca",
      estrellas: 5
    });
    hotelId = hotelResponse.data.id;

    // Crear habitación
    const habitacionResponse = await axios.post(`${API_URL}/habitaciones`, {
      hotel_id: hotelId,
      numero: "201",
      tipo: "suite",
      precio_noche: 150.00,
      disponible: true
    });
    habitacionId = habitacionResponse.data.id;

    // Crear huésped
    const huespedResponse = await axios.post(`${API_URL}/huespedes`, {
      nombre: "Ana García",
      email: "ana.garcia@email.com",
      telefono: "0987654321",
      documento: "1798765432"
    });
    huespedId = huespedResponse.data.id;
  });

  test('GET /reservas debe retornar lista de reservas', async () => {
    const response = await axios.get(`${API_URL}/reservas`);
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
  });

  test('POST /reservas debe crear una reserva', async () => {
    const nuevaReserva = {
      habitacion_id: habitacionId,
      huesped_id: huespedId,
      fecha_entrada: "2026-03-01",
      fecha_salida: "2026-03-05"
    };
    
    const response = await axios.post(`${API_URL}/reservas`, nuevaReserva);
    
    expect(response.status).toBe(201);
    expect(response.data.habitacion_id).toBe(habitacionId);
    expect(response.data.huesped_id).toBe(huespedId);
    expect(response.data.estado).toBe("pendiente");
    expect(response.data.precio_total).toBeDefined();
    expect(response.data.id).toBeDefined();
    
    reservaId = response.data.id;
  });

  test('GET /reservas/:id debe retornar una reserva', async () => {
    const response = await axios.get(`${API_URL}/reservas/${reservaId}`);
    
    expect(response.status).toBe(200);
    expect(response.data.id).toBe(reservaId);
  });

  test('PUT /reservas/:id/cancelar debe cancelar la reserva', async () => {
    const response = await axios.put(`${API_URL}/reservas/${reservaId}/cancelar`);
    
    expect(response.status).toBe(200);
    expect(response.data.estado).toBe("cancelada");
  });

});
