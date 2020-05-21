const app = require('./config/server');

// Importing routes
const dataRoutes = require('./routes/index');
// Routes
app.use('/', dataRoutes);

// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});