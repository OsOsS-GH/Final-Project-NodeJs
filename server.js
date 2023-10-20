// Load Environment Variables
require('dotenv').config();
// Grap App Dependencies
const http = require('http'),
      app = require('./app'),
      port = process.env.PORT || 8000;

// Create Application Server
http.createServer(app);

// Running App Server
app.listen(port, () => {
    console.log(`Server running on localhost:${port}`);
});