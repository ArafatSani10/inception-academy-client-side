import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckOutForm from './CheckOutForm';
// TODO:add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_payment_gateway_PK)


const Payment = () => {
    return (
        <div>
            <Elements stripe={stripePromise}>
                <CheckOutForm></CheckOutForm>
            </Elements>
        </div>
    );
};

export default Payment;