const express = require('express')
const app = express()
const port = 8000;
const axios = require('axios');

const produce = require("./producer")


// call the `produce` function and log an error if it occurs




app.use(express.json());

const result= null;
app.get('/collect' , (req, res)=>
{
   console.log(req.query.Result)
   const result=req.query.Result
   const obj= JSON.parse(result)
   console.log(" I am in GET COLLECT API   " , obj)
   console.log("Topic Is"  , req.query.Action)
   
   axios.post('http://localhost:5001/sendMsg', {
      topic: req.query.Action,
      message : result
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });



   res.send(req.query.Result)
   

})


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

module.exports=result;