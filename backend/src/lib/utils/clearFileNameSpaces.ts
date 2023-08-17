// file viene de req.file
export const clearFileNameSpaces = (file: Express.Multer.File): void => {
  const { originalname } = file;
  console.log(originalname)
  // Si el archivo tiene espacios, cambiar los espacios del originalname por guiones bajos
  if (originalname.split(' ').length > 1) {
    file.originalname = originalname.replace(/\s+/g, '_');
  }
};
