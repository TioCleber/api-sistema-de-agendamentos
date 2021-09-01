import express from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';
import FileController from './controllers/FileController';
import CollaboratorController from './controllers/CollaboratorController';
import AppointmentController from './controllers/AppointmentController';
import ScheduleController from './controllers/ScheduleController';
import NotificationController from './controllers/NotificationController';

import authMiddlewares from './middlewares/auth';

const routes = express.Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

//Rotas autenticadas
routes.use(authMiddlewares);
routes.put('/users', UserController.update);

//Rota de agendamento
routes.post('/appointments', AppointmentController.store);
routes.get('/appointments', AppointmentController.index);

//Lista todos colaboradores
routes.get('/collaborator', CollaboratorController.index);

//Listagem de agendamentos colaborador
routes.get('/schedule', ScheduleController.index);

//Listagem de Notificações
routes.get('/notifications', NotificationController.index);

//Marcar como lida
routes.put('/notifications/:id', NotificationController.update);

//Upload de arquivos
routes.post('/files', upload.single('file'), FileController.store);

export default routes;