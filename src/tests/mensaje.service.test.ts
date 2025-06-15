import { setMensaje, getMensajes } from '@/app/services/mensaje.service';
import { Mensaje } from '@/app/dbentities/mensaje';
import { getDataSource, closeDataSource } from '@/app/utils/ds-singleton';

jest.mock('@/app/utils/ds-singleton', () => ({
  getDataSource: jest.fn(),
  closeDataSource: jest.fn()
}));

describe('Mensaje Service', () => {
  const mockSave = jest.fn();
  const mockFind = jest.fn();
  const mockDataSource = {
    manager: { save: mockSave, find: mockFind }
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (getDataSource as jest.Mock).mockResolvedValue(mockDataSource);
  });

  describe('setMensaje', () => {
    it('debería guardar un mensaje correctamente', async () => {
      await setMensaje('Juan', '123456789', 'Hola mundo');

      expect(getDataSource).toHaveBeenCalled();
      expect(mockSave).toHaveBeenCalledWith(expect.objectContaining({
        nombre: 'Juan',
        telefono: '123456789',
        mensaje: 'Hola mundo'
      }));
      expect(closeDataSource).toHaveBeenCalled();
    });

    it('debería lanzar error si falla el guardado', async () => {
      mockSave.mockRejectedValueOnce(new Error('Fallo DB'));
      
      await expect(setMensaje('Juan', '123456789', 'Hola mundo'))
        .rejects.toThrow('Error al almacenar mensaje: Fallo DB');

      expect(closeDataSource).toHaveBeenCalled();
    });
  });

  describe('getMensajes', () => {
    it('debería obtener y formatear mensajes correctamente', async () => {
      const mockDate = new Date('2024-01-01T12:34:56');
      mockFind.mockResolvedValueOnce([
        { id: 1, nombre: 'Juan', telefono: '123', mensaje: 'Hola', horaMensaje: mockDate }
      ]);

      const result = await getMensajes();

      expect(getDataSource).toHaveBeenCalled();
      expect(mockFind).toHaveBeenCalledWith(Mensaje, { order: { horaMensaje: 'DESC' } });
      expect(result[0]).toEqual(expect.objectContaining({
        nombre: 'Juan',
        telefono: '123',
        mensaje: 'Hola',
        horaMensaje: '01/01/2024 - 12:34:56'
      }));
      expect(closeDataSource).toHaveBeenCalled();
    });

    it('debería lanzar error si falla la obtención', async () => {
      mockFind.mockRejectedValueOnce(new Error('Fallo DB'));

      await expect(getMensajes()).rejects.toThrow('Error al obtener mensajes: Fallo DB');
      expect(closeDataSource).toHaveBeenCalled();
    });
  });
});