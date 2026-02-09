import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:3000';

describe('API de Huéspedes', () => {
  
  let huespedId: string;

  test('GET /huespedes debe retornar lista de huéspedes', async () => {
    const response = await axios.get(`${API_URL}/huespedes`);
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
  });

  test('POST /huespedes debe crear un huésped', async () => {
    const nuevoHuesped = {
      nombre: "Carlos Mendoza",
      email: "carlos.mendoza@email.com",
      telefono: "0991234567",
      documento: "1712345678"
    };
    
    const response = await axios.post(`${API_URL}/huespedes`, nuevoHuesped);
    
    expect(response.status).toBe(201);
    expect(response.data.nombre).toBe("Carlos Mendoza");
    expect(response.data.email).toBe("carlos.mendoza@email.com");
    expect(response.data.id).toBeDefined();
    
    huespedId = response.data.id;
  });

  test('GET /huespedes/:id debe retornar un huésped', async () => {
    const response = await axios.get(`${API_URL}/huespedes/${huespedId}`);
    
    expect(response.status).toBe(200);
    expect(response.data.nombre).toBe("Carlos Mendoza");
  });

  test('GET /huespedes/:id con ID inexistente debe retornar 404', async () => {
    try {
      await axios.get(`${API_URL}/huespedes/id-inexistente-456`);
    } catch (error: any) {
      expect(error.response.status).toBe(404);
    }
  });

});
