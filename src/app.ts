import 'express-async-errors';
import express from 'express';
import errorHandler from './middlewares/errorHandler';
import carRoute from './routes/carRoute';
import motorcycleRoute from './routes/motorcycleRoute';

const app = express();

app.use(express.json());

app.use('/cars', carRoute);

app.use('/motorcycles', motorcycleRoute);

app.use(errorHandler);

export default app;
