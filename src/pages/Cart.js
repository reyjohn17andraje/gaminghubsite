import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function Cart() {
    const [cart, setCart] = useState({ cart: { cartItems: [] } });
    const [selectedProductId, setSelectedProductId] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editQuantity, setEditQuantity] = useState(0);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch(`https://gaminghub-2.onrender.com/carts/getcart`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setCart(data);
            })
            .catch(error => console.error('Error fetching cart data:', error));
    };

    const calculateTotalPrice = () => {
        return cart.cart.cartItems.reduce((total, product) => total + (product.price * product.quantity), 0);
    };

    const handleCheckout = () => {
        fetch(`https://gaminghub-2.onrender.com/orders/checkout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === "Order placed successfully") {
                    setCart({ cart: { cartItems: [] } });
                    Swal.fire({
                        icon: 'success',
                        title: 'Cart Checked Out!',
                        text: 'Thank you for your purchase!',
                        timer: 10000,
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Checkout Failed',
                        text: 'There was an issue with the checkout. Please try again.',
                        timer: 10000,
                    });
                }
            })
            .catch(error => {
                console.error('Error during checkout:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Checkout Failed',
                    text: 'There was an error during checkout. Please try again.',
                    timer: 10000,
                });
            });
    };

    const handleEditQuantity = (productId, quantity) => {
        setSelectedProductId(productId);
        setEditQuantity(quantity);
        setShowModal(true);
    };

    const handleSaveQuantity = () => {
        fetch(`https://gaminghub-2.onrender.com/carts/updatecartquantity`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                productId: selectedProductId,
                quantity: editQuantity,
            }),
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Failed to update quantity');
            })
            .then(data => {
                Swal.fire({
                    icon: 'success',
                    title: 'Quantity Updated',
                    text: 'Quantity has been successfully updated.',
                    timer: 10000,
                });
                fetchData();
                setShowModal(false);
            })
            .catch(error => {
                console.error('Error updating quantity:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Update Failed',
                    text: 'There was an issue updating the quantity. Please try again.',
                    timer: 10000,
                });
            });
    };

    const deleteCartItem = (productId) => {
        fetch(`https://gaminghub-2.onrender.com/carts/${productId}/removefromcart`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Failed to delete item from cart');
            })
            .then(data => {
                Swal.fire({
                    icon: 'success',
                    title: 'Item Removed',
                    text: 'The item has been successfully removed from the cart.',
                    timer: 10000,
                });
                fetchData();
            })
            .catch(error => {
                console.error('Error deleting item from cart:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Removal Failed',
                    text: 'There was an issue removing the item from the cart. Please try again.',
                    timer: 10000,
                });
            });
    };

    const renderCartItems = () => {
        if (!cart.cart || cart.cart.cartItems.length === 0) {
            return (
                <tr>
                    <td colSpan="5" className="text-center align-middle">Cart is empty</td>
                </tr>
            );
        }

        return (
            <>
                {cart.cart.cartItems.map(cartItem => (
                    <tr key={cartItem._id}>
                        <td className="text-center align-middle">{cartItem._id}</td>
                        <td className="text-center align-middle">{cartItem.name}</td>
                        <td className="text-center align-middle">{cartItem.quantity}</td>
                        <td className="text-center align-middle">&#8369;{cartItem.price * cartItem.quantity}.00</td>
                        <td className="text-center align-middle">
                            <Button variant="info" onClick={() => handleEditQuantity(cartItem.productId, cartItem.quantity)}>
                                Edit Quantity
                            </Button>
                            <Button variant="danger" onClick={() => deleteCartItem(cartItem.productId)}>Delete</Button>
                        </td>
                    </tr>
                ))}
                <tr>
                    <td colSpan="3" className="text-center align-middle"></td>
                    <td className="text-center align-middle"><strong>Total Price: &#8369;{calculateTotalPrice().toFixed(2)}</strong></td>
                    <td className="text-center align-middle"><Button variant="success" onClick={handleCheckout}>Proceed to Checkout</Button></td>
                </tr>
            </>
        );
    };

    return (
        <div>
            <h1 className="text-center my-4">Your Cart</h1>

            <Table striped bordered hover responsive>
                <thead>
                    <tr className="text-center">
                        <th>ID</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th colSpan="1">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {renderCartItems()}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Quantity</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="editQuantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                value={editQuantity}
                                onChange={(e) => setEditQuantity(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveQuantity}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
