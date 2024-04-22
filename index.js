import express from 'express';
import 'dotenv/config';
import axios from "axios";

const app = express();



app.get("/",(req,res)=>{
    res.send("hello world");
})

app.get("/pay",(req,res)=>{
    const payEnd = "/pg/v1/pay";


    

const options = {
  method: 'post',
  url: `${process.env.PHONE_PE_HOST_URL}${payEnd}`,
  headers: {
        accept: 'text/plain',
        'Content-Type': 'application/json',
				},
data: {
}
};
axios
  .request(options)
      .then(function (response) {
      console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });


})


app.listen(process.env.PORT,()=>{
    console.log(`listening on port ${process.env.PORT}`);
})