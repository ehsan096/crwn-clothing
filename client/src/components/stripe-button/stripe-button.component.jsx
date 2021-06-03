import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
const StripeCheckoutButton=({price})=>{
    const priceForStripe = price*160;
    const publishableKey = 'pk_test_51IUYW6FgjxFXvnV9599fenog5BUa9GdoAhVxwvvHPz7f7UGzE7ZgOkudixUWBaH6UQSZNDlkLBXDoSeBeiIEc8h000GusFgZIP';

   const onToken = token=>{
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        }).then(response=>{
            alert('payment successful');
        }).catch(error=>{
            console.log('payment error '+JSON.parse(error));
            alert('There was an issue with your payment. Please make sure you use the provided credit card');
        });
    }
    return (
        <StripeCheckout 
            label='Pay Now'
            name= 'CRWN Clothing LTD.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={publishableKey}
        />
    );

};

export default StripeCheckoutButton;
