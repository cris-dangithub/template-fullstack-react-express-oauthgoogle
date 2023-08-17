// file viene de req.file
/**
 * Cambia los espacios de el nombre de un archivo por guiones bajos.
 * Cambia directamente en la referencia
 * @param file archivo a cambiar el nombre
 */
export const clearFileNameSpaces = (file: Express.Multer.File): void => {
  const { originalname } = file;
  // Si el archivo tiene espacios, cambiar los espacios del originalname por guiones bajos
  if (originalname.split(' ').length > 1) {
    file.originalname = originalname.replace(/\s+/g, '_');
  }
};