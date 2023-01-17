'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const images_1 = __importDefault(require('./routes/images/images'));
const app = (0, express_1.default)();
const port = 3001;
// Start homepage
app.get('/', (req, res) => {
  res.send('Homepage');
});
// use middleware for images route
app.use('/images', images_1.default);
// listen to the port and start server using express
app.listen(port, () => {
  console.log(`Server is Started at http://localhost:${port}`);
});
exports.default = app;
