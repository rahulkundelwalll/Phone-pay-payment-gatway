import express from "express";
import "dotenv/config";
import axios from "axios";
import uniqid from "uniqid";
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

const x_verify = ;

  const options = {
    method: "post",
    url: `${process.env.PHONE_PE_HOST_URL}${payEnd}`,
    headers: {
      accept: "text/plain",
      "Content-Type": "application/json",
    },
    data: {},
  };
  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
});

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
