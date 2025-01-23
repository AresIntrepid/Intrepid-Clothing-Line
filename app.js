const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const mongoose = require('mongoose');
const config = require('./modules/config');
const routes = require('./routes/index');

const app = express();

mongoose.connect(config.mongoURI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB Connection Error:', err));

// Handlebars setup with runtime options
app.engine('handlebars', engine({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});
