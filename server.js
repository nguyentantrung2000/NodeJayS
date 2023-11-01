// init port and start server

const app = require("./src/app");

const PORT = process.env.PORT || 3056;

const server = app.listen(PORT, () => {
    console.log(`Server NodeJayH running on port ${PORT}`);
});

process.on("SIGINT", ()=>{
    console.log("Stopping server NodeJayH");
    server.close();
    process.exit();
})