import app from "./index";

const server = app; 


const port = process.env.PORT || 3000;

server.listen(port, () => console.log(`App listening on PORT ${port}`));


module.exports = server;

