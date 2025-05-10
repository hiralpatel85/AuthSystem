const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());


sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database & tables updated!');
  })
  .catch((err) => {
    console.error('Error updating database:', err.message);
  });

app.use('/api/auth', authRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await sequelize.sync();
});
