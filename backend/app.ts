require('dotenv').config();
// 1. importamos el modelo
import Server from './src/models/server';

// 2. Instaciamos la clase
const server = new Server();

//3. Ponemos a escuchar la clase
server.listen();

//-----
//DELETE: Etiquetas: TODO: "Tareas a desarrollar en el template"; TODODEV: "Tareas a desarrollar al momento de usar el template"; DELETE: Comentarios a eliminar en un proyecto
