import express from 'express';
import images from './routes/images/images';

const app = express();
const port = 3001;

// Start homepage
app.get('/', (req, res) => {
  res.send('Homepage');
});

// use middleware for images route
app.use('/images', images);

// listen to the port and start server using express
app.listen(port, () => {
  console.log(`Server is Started at http://localhost:${port}`);
});
export default app;
