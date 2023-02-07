import React, { useState, useEffect, useContext } from 'react';
import './detailsSection.styles.css';
import { useParams, useNavigate } from 'react-router-dom';
import { BookData } from '../../../util/BookData';
import { UserContext, CartContext } from '../../../App';

const DetailsSection = () => {
    const { id } = useParams();
    const [bookData, setBookData] = useState({});

    const user = useContext(UserContext);
    const {cartItems, setCartItems} = useContext(CartContext);

    const navigate = useNavigate();
    
    useEffect(() => {
        let newData = BookData.filter((book) => book.id === parseInt(id));
        setBookData(newData[0])
    },[id])

    const handleAddToCart = () => {
        if(user) {
            //add to cart
            setCartItems([...cartItems, bookData]);
            alert(`El libro ${bookData.book_name} fue añadido al carrito`);
        } else {
            navigate('/login');
            alert("Por favor inicie sesion..");
        }
    }

    return (
        <section className="detail-section-container">
            <div className='container'>
                <div className="flex-container">
                    <div className='book-img-container'>
                        <img src={bookData.book_url} alt="book" />
                    </div>

                    <div className='book-detail-container'>
                        <h2>{bookData.book_name}</h2>
                        <p className="text-primary">{bookData.author_name}</p>
                        <p className="book-description">{bookData.book_description}</p>
                        <p><b>Idioma</b>: {bookData.language}</p>
                        <p><b>Cantidad de paginas</b> : {bookData.print_length}</p>

                        <h3>&#36;{bookData.price}</h3>

                        <a onClick={handleAddToCart} className="button-primary">Añadir al carrito</a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DetailsSection;