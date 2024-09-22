/**
 * Provides an Express.js server that exposes an API endpoint to extract job data from Indeed.
 * 
 * The server listens on the port specified by the `PORT` environment variable, or port 5000 if not set.
 * 
 * The `/data` endpoint accepts POST requests with `what` and `where` parameters, and responds with the status and path of the extracted job data.
 * 
 * The `jobDataExtracter` module is used to perform the actual job data extraction.
 */
const express=require('express');
const bodyParser=require('body-parser');

const jobDataExtracter=require('./jobData');

const app =express();
app.use(express.static("public"));

const port=process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.post('/data',(req,res)=>{

    const {what,where}=req.body;
    jobDataExtracter(what,where).then((result)=>{
        res.send({
            status:result.status,
            path:result.path
        })
        console.log("Compeleted Extracted Data")
    }).catch((err)=>{
        console.log(err)
    })
})

app.listen(port,()=>{
    console.log("Server is working");                                                                                                                                                                         
})

