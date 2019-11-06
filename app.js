require('dotenv').config();

const express= require('express');
const app= express();
const user = require('./controllers/usercontroller')
const office = require('./controllers/officecontroller')
const sequelize = require('./db')  //how we import our database



sequelize.sync();
app.use(express.json());

app.use(require('./middleware/headers'))

app.use('/', user);
app.use(require('./middleware/validate-session'));
//office will be a protected route
app.use('/office', office);


app.listen(3000, function() {
    console.log("Travel N Code is listening on Port 3000.")
})

