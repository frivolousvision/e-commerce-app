const router = require("express").Router();
const { default: Stripe } = require("stripe");
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get("/", authorization, async (req, res) => {
  const { user } = req.user;
  const { name, email, product, token } = req.body;
  const idempontencyKey = uuid();

  return Stripe.customers
    .create({
      email: email,
      source: token.id,
    })
    .then((customer) => {
      Stripe.charges.create(
        {
          amount: product.price * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: product.name,
          shipping: {
            name: token.card.name,
            address: {
              country: token.card.address_country,
            },
          },
        },
        { idempontencyKey }
      );
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
});

module.exports = router;
