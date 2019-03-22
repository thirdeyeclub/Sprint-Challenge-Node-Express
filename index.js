// play this: https://www.youtube.com/watch?v=d-diB65scQU (YES YES YES! https://www.youtube.com/watch?v=zaGUr6wzyT8)
const server = require('./server');

const PORT = process.env.PORT || 4000;

server.listen(PORT, ()=>
    console.log(`***Up and running on ${PORT}***`))