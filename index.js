// play this: https://www.youtube.com/watch?v=d-diB65scQU
const server = require('./server');

const PORT = process.env.PORT || 4000;

server.listen(PORT, ()=>
    console.log(`***Up and running on ${PORT}***`))

// code away!
