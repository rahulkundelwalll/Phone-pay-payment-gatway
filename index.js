import express from "express";
import "dotenv/config";
import axios from "axios";
import uniqid from "uniqid";
import sha256 from "sha256";

const app = express();

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/pay", (req, res) => {
  const payEnd = "/pg/v1/pay";
  const MERCHANT_TRANCTION_ID = uniqid();
  const user_id = "123";

  const payload = {
    merchantId: process.env.Merchant_ID,
    merchantTransactionId: MERCHANT_TRANCTION_ID,
    merchantUserId: user_id,
    amount: 100,
    redirectUrl: `http://localhost:3000/redirect-url/${MERCHANT_TRANCTION_ID}`,
    redirectMode: "REDIRECT",
    mobileNumber: "9999999999",
    paymentInstrument: {
      type: "PAY_PAGE",
    },
  };

    
  //   "SHA256(base64 encoded payload + "/pg/v1/pay" + salt key) + ### + salt index"
  const bufferObj = Buffer.from(JSON.stringify(payload), "utf-8");
  const base64EncodedPayload = bufferObj.toString("base64");

  const x_verify =
    sha256(base64EncodedPayload + payEnd + process.env.SALT_KEY) +
    "###" +
    process.env.SALT_INDEX;

    const options = {
      method: "post",
      url: `${process.env.PHONE_PE_HOST_URL}${payEnd}`,
      headers: {
        accept: "application/json", // Change to application/json
        "Content-Type": "application/json",
        "X-VERIFY": x_verify,
      },
      data: {
        request: base64EncodedPayload,
      },
    };
  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      const url = response.data.data.instrumentResponse.redirectInfo.url;
      res.send(url);
    })
    .catch(function (error) {
      console.error(error);
    });
});

app.get("/redirect-url/:merchantId",(req,res)=>{
  const {merchantTransactionId} = req.params;  
  res.send()
})


app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
  
});
