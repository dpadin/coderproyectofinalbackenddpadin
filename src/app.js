import http from "http"

const server = http.createServer ((req,res)=>{

    res.end ("mi primer hola web")
}) 

server.listen(8080,()=> {
    console.log("Server on 8080")

})