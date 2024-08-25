
import express from 'express'
import { AppDataSource } from './database/db';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import router from './routes';
export class app{
    public express = express.application;
	private porta: number = 5000;

    constructor() {
		dotenv.config();
		this.express = express()
		this.listen();
		this.middlewares();
		this.rotas();

	}
    private listen(): void {
		
		AppDataSource.initialize().then(async () => {
			console.log('Database OK');
			this.express.listen(5000, () => {
				console.log('Server started on port 5000');
			})
		})
	}
    private middlewares(): void {
		this.express.use(cors());
		this.express.use(morgan('combined'));
		this.express.use(cookieParser());
		this.express.use(helmet());
		this.express.use(express.json());
		this.express.use(compression());
		this.express.use(bodyParser.json());
		
	}

	private rotas() {
		this.express.use('/',router)
	}
}