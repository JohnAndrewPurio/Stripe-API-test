var readlineSync = require('readline-sync');
var Stripe = require('stripe');
const stripe = Stripe('sk_test_51IiswEJlgNAMSpa0Igxa7QXb355sIO9hhTuJx7BpsAKmy89TK88BjDTyN31sFwHKowUXO4dMtl7ujuHFyPkSKNMv00Czp3PFNF');
let charge = {
    value: 360, 
    currency: 'USD'
};

async function retrieveCharges(charge, input) {
    try {
        const token = await stripe.tokens.create(input);
        const charges = await stripe.charges.create({
            amount: charge.value,
            currency: charge.currency,
            description: 'Test Charge',
            source: 'tok_mastercard'
        });
        
        console.log('\n\nCreated card token with id:', token.id);
        console.log('Created charge with id:', charges.id, '\n\n');
    } catch (error) {
        console.log('\n\n', error.raw.message, '\n\n');
    }
    

    // const retrieve = await stripe.charges.retrieve(
    //     'ch_1IiswIJlgNAMSpa0KIK3QtqX'
    //   );
}

function retrieveUserInput() {
    let input = {
        card: {
          number: readlineSync.question('Enter your card number: ').replace(' ', ''),
          exp_month: readlineSync.question('Enter card expiry month: '),
          exp_year: readlineSync.question('Enter card expiry year: '),
          cvc: readlineSync.question('Enter card CVC code: ').toString(),
        }
    }

    retrieveCharges(charge, input);
}

retrieveUserInput();

