const cookieParser = require('cookie-parser');
const express = require('express');
const authRoutes = require('./routes/auth.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const userRoutes = require('./routes/user.routes');
const taskRoutes = require('./routes/task.routes');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cookieParser())


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))


app.use('/api/auth', authRoutes)
app.use('/api/dashboard', dashboardRoutes)

app.use('/api/users',userRoutes)

app.use('/api/tasks',taskRoutes)

module.exports = app;