import React, {useContext} from "react";
import './cart-items-container.styles.css';
import CartItemCard from "../../cards/cart-item-card/CartItemCard";
import { CartContext } from '../../../App';
import StripeCheckout from "react-stripe-checkout";
import { useNavigate } from 'react-router-dom';

const CartItemsContainer = () => {
    const { cartItems, totalAmount } = useContext(CartContext);
    const stripeKey = 'pk_test_VvWjqy13EI2MSDgDxy3b5jbx00KrrL41yi';
    const navigate = useNavigate();

    const onToken = (token) => {
        console.log(token);
        alert('Su pago ha sido procesado');
        navigate('/books');
    }

    return (
        <section className="cart-items-container">
            <div className="container">
                {totalAmount === 0 ? (
                    <h2>Su carrito esta vacio</h2>
                ):(
                    <React.Fragment>
                        <h2>Carrito</h2>

                        {cartItems.map((item) => (
                            <CartItemCard key={item.id} bookData={item} />
                        ))}

                        <h2>Total a pagar = &#36;{totalAmount}</h2>

                        <StripeCheckout
                            name="Book Checkout"
                            description="Por favor ingrese sus datos"
                            amount={totalAmount * 100}
                            currency="INR"
                            stripeKey={stripeKey}
                            token={onToken}
                            billingAddress
                        >
                            <button className="button-primary">Proceder a pagar</button>
                        </StripeCheckout>
                    </React.Fragment>
                )}
            </div>
        </section>
    )
}

export default CartItemsContainer;