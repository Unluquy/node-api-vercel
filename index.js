const app = require('./app');
const config = require('./config/config.js');

const PORT = 5000

console.log(`NODE_ENV=${config.NODE_ENV}`);
app.listen(PORT, () => console.log('Server started on port ' + PORT));