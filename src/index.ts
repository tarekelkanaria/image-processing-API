import * as express from 'express';
import { Request, Response } from 'express';
import images from './routes/images/images';

const app = express.default();
const port = 3001;

// Start homepage
app.get('/', (req: Request, res: Response): void => {
  res.send('Homepage');
});

// use middleware for images route
app.use('/images' as string, images as express.Router);

// listen to the port and start server using express
app.listen(port, (): void => {
  console.log(`Server is Started at http://localhost:${port}`);
});
export default app;
