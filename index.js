const express = require('express');
const { resolve } = require('path');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.static('static'));
app.use(cors());

function generateProfileUrl(username) {
  let result = 'https://github.com/' + username;
  return result;
}

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let total = newItemPrice + cartTotal;
  res.send(total.toString());
});

app.get('/membership-discount', (req, res) => {
  let isMember = req.query.isMember === 'true';
  let cartTotal = parseFloat(req.query.cartTotal);
  let discount = 0.1;
  let total;
  if (isMember) {
    total = cartTotal * (1 - discount);
  } else {
    total = cartTotal;
  }
  res.send(total.toString());
});

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let tax = 0.05;
  let total = cartTotal * tax;
  res.send(total.toString());
});

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  let total;
  if (shippingMethod.toLowerCase() === 'express') {
    total = distance / 100;
  } else {
    total = distance / 50;
  }
  res.send(total.toString());
});

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let total = weight * distance * 0.1;
  res.send(total.toString());
});

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let total = purchaseAmount * 2;
  res.send(total.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
