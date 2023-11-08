const express = require('express');
const path = require('path')

const app = express();

app.use(express.static(path.join(__dirname, "client")));
app.use(express.json())
//rotas
app.use('/notification', require('./notification-routes'));

const PORT = 5000;
app.listen(PORT, (error) => {
	if (!error)
		console.log("Server is Successfully Running, and App is listening on port " + PORT)
	else
		console.log("Error occurred, server can't start", error);
}
); 