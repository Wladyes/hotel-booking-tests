import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:3000';

describe('API de Hoteles', () => {
  
  let hotelId: string;

  test('GET /hoteles debe retornar lista de hoteles', async () => {
    const response = await axios.get(`${API_URL}/hoteles`);
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
  });

  test('POST /hoteles debe crear un hotel', async () => {
    const nuevoHotel = {
      nombre: "Hotel Paradise",
      direccion: "Av. Principal 123",
      ciudad: "Quito",
      estrellas: 4
    };
    
    const response = await axios.post(`${API_URL}/hoteles`, nuevoHotel);
    
    expect(response.status).toBe(201);
    expect(response.data.nombre).toBe("Hotel Paradise");
    expect(response.data.ciudad).toBe("Quito");
    expect(response.data.id).toBeDefined();
    
    hotelId = response.data.id;
  });

  test('GET /hoteles/:id debe retornar un hotel específico', async () => {
    const response = await axios.get(`${API_URL}/hoteles/${hotelId}`);
    
    expect(response.status).toBe(200);
    expect(response.data.nombre).toBe("Hotel Paradise");
  });

  test('GET /hoteles/:id con ID inexistente debe retornar 404', async () => {
    try {
      await axios.get(`${API_URL}/hoteles/id-inexistente-123`);
    } catch (error: any) {
      expect(error.response.status).toBe(404);
    }
  });

});
