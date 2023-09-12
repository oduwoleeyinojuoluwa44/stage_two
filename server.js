import * as dotenv from 'dotenv';
import express from 'express';
import router from './routes/index.js';
import connectToDB from './utils/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', router);

app.listen(PORT, () => {
  connectToDB();
  console.log(`Server is listening on port ${PORT}`);
});
