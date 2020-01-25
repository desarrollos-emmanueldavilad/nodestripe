const {Router} = require('express');
const router = Router();
const stripe = require('stripe')('sk_test_O8sK4LijirBbK3gXRsqgHAhC00aTfePVPl');

router.get('/', (req,res) => {
    res.render('index');
});

router.post('/checkout', async (req, res) =>{
    console.log(req.body);
   const customer = await stripe.customers.create({
        email:req.body.stripeEmail,
        source: req.body.stripeToken
    });
   const order = await stripe.charges.create({
        amount: '3000',
        currency: 'eur',
        customer: customer.id,
        description: 'VideoGames Software'
    });
    console.log(order.id);
    //Final Show a success view
    res.render('download');
});

module.exports = router;