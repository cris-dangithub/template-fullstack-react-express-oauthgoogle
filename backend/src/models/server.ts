import { Application, NextFunction, Request, Response } from 'express';
import { RateLimitRequestHandler } from 'express-rate-limit';

import express = require('express');
import cors = require('cors');
import morgan = require('morgan');
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
const xss = require('xss-clean');
import hpp = require('hpp');

import db from '../lib/database/db';
import { authRouter } from '../routes/auth.routes';

import initModel from './init.model';
import AppError from '../lib/utils/appError';
import { globalErrorHandler } from '../controllers/error.controller';
import { userRouter } from '../routes/user.routes';
import { googleRouter } from '../routes/google.routes';

type namePath = 'user' | 'auth' | 'google';

class Server {
  readonly app: Application;
  readonly port: number;
  readonly limiter: RateLimitRequestHandler;
  readonly paths: Record<namePath, string>;
  constructor() {
    this.app = express();
    this.port = Number(process.env.PORT) || 4000;
    this.limiter = rateLimit({
      // Numero de peticiones máximas a permitir a una misma IP
      max: 100,
      // Ventana de tiempo que haré las anteriores peticiones (milisegundos)
      windowMs: 60 * 60 * 1000, // Esto es 1hora
      // Mensaje cuando esto ocurra
      message: 'Too many request from this IP',
    });

    this.paths = {
      user: '/api/v1/user',
      auth: '/api/v1/auth',
      google: '/api/v1/google',
    };

    this.database();
    this.middlewares();
    this.routes();
  }

  //! MÉTODO DE CONEXIÓN CON LA BASE DE DATOS (DESCOMENTAR)
  database(): void {
    // ---- Autenticación de la base de datos ---- //
    db.authenticate()
      .then(() => console.log('Database authenticated'))
      .catch(err => console.log(err));

    // ---- Establecer modelos ---- //
    initModel();

    // ---- Sincronizar la base de datos ---- //
    db.sync()
      .then(() => console.log('Database synced'))
      .catch(err => console.log(err));
  }

  // RUTAS
  routes(): void {
    // Endpoints
    this.app.use(this.paths.auth, authRouter);
    this.app.use(this.paths.user, userRouter);
    this.app.use(this.paths.google, googleRouter);
    // Capturar para cualquier ruta este error (ya cuando no ha encontrado ninguna ruta)
    this.app.all('*', (req: Request, res: Response, next: NextFunction) => {
      return next(
        new AppError(`Can't find ${req.originalUrl} on this server`, 404)
      );
    });
    // Contendrá todos los errrores de mi aplicación
    this.app.use(globalErrorHandler);
  }

  // METODO PARA CONFIGURAR ALGUNOS MIDDLEWARES COMO CONFIGURACIÓN DE CORS Y EXPRESS EN JSON
  middlewares(): void {
    this.app.use(helmet());
    this.app.use((req, res, next) => {
      res.setHeader(
        'Content-Security-Policy-Report-Only',
        'script-src https://accounts.google.com/gsi/client; frame-src https://accounts.google.com/gsi/; connect-src https://accounts.google.com/gsi/;'
      );
      next();
    });
    this.app.use(xss());
    this.app.use(hpp({}));
    if (process.env.NODE_ENV === 'development') {
      console.log('***DEV ENVIRONMENT***');
      this.app.use(morgan('dev')); // Solamente usaremos morgan en modo desarrollo
    }
    if (process.env.NODE_ENV === 'production') {
      console.log('***PROD ENVIRONMENT***');
    }
    this.app.use('/api/v1', this.limiter);
    this.app.use(cors());
    this.app.use(express.json());
  }

  // METODO PARA ESCUCHAR SOLICITUDES POR EL PUERTO
  listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

export default Server;
