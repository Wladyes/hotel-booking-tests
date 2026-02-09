import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:3000';

describe('API de Habitaciones', () => {
  
  let hotelId: string;
  let habitacionId: string;

  beforeAll(async () => {
    // Crear hotel para las pruebas
    const response = await axios.post(`${API_URL}/hoteles`, {
      nombre: "Hotel Test Habitaciones",
      direccion: "Calle Test 456",
      ciudad: "Guayaquil",
      estrellas: 3
    });
    hotelId = response.data.id;
  });

  test('GET /habitaciones debe retornar lista de habitaciones', async () => {
    const response = await axios.get(`${API_URL}/habitaciones`);
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
  });

  test('POST /habitaciones debe crear una habitación', async () => {
    const nuevaHabitacion = {
      hotel_id: hotelId,
      numero: "101",
      tipo: "doble",
      precio_noche: 75.00,
      disponible: true
    };
    
    const response = await axios.post(`${API_URL}/habitaciones`, nuevaHabitacion);
    
    expect(response.status).toBe(201);
    expect(response.data.numero).toBe("101");
    expect(response.data.tipo).toBe("doble");
    expect(response.data.id).toBeDefined();
    
    habitacionId = response.data.id;
  });

  test('GET /habitaciones/:id debe retornar una habitación', async () => {
    const response = await axios.get(`${API_URL}/habitaciones/${habitacionId}`);
    
    expect(response.status).toBe(200);
    expect(response.data.numero).toBe("101");
  });

  test('GET /hoteles/:id/habitaciones debe retornar habitaciones del hotel', async () => {
    const response = await axios.get(`${API_URL}/hoteles/${hotelId}/habitaciones`);
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBeGreaterThan(0);
  });

});
