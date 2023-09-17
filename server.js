// init port and start server

const app = require("./src/app");

const port = 1113;

const server = app.listen(port, () => {
    console.log(`Server NodeJayH running on port ${port}`);
});

process.on("SIGINT", ()=>{
    console.log("Stopping server NodeJayH");
    server.close();
    process.exit();
})