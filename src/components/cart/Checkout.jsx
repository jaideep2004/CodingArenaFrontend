import { useEffect, useState } from "react";
import axios from "axios";
import OrderItem from './OrderItem'
import './cart.css'
import { useNavigate } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";



const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [name, setName] = useState(""); // Add state for name
  const [address, setAddress] = useState(""); // Add state for address
  const [email, setEmail] = useState(""); // Add state for email

  const [orderPlaced, setOrderPlaced] = useState(false);
 
  

  useEffect(() => {
    // Fetch the list of courses in the cart from your API
    axios
      .get("http://localhost:3001/cart")
      .then((response) => {
        setCart(response.data);

        // Calculate the total when the cart data is fetched
        const cartTotal = response.data.reduce((acc, course) => acc + course.price, 0);
        setTotal(cartTotal);
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
      });
  }, []);

  const handlePlaceOrder = (event) => {
	event.preventDefault(); 
  
    // Prepare the order data to send to the backend
    const orderData = {
      name,
      address,
      email,
      cart,
    };

	 // Retrieve the JWT token from localStorage
	 const token = localStorage.getItem('jwtToken');

	 // Add the token to the headers
	 const headers = {
	   Authorization: token,
	   
	 };

	 
    // Send a POST request to the backend to place the order
    axios
      .post("http://localhost:3001/checkout", orderData,{ headers })
      .then((response) => {
        console.log("Order placed successfully");
		  // Clear the cart and reset the form
		  setCart([]); // Clear the cart
		  setName(""); // Clear the name input
		  setAddress(""); // Clear the address input
		  setEmail("");
      setTotal('') // Clear the total input
		  setOrderPlaced(true);
      toast.success("Order Placed successfully")
        // Optionally, you can clear the cart and show a confirmation message
      })
      .catch((error) => {
        console.error("Error placing order:", error);
      });
  };

  const navigate = useNavigate();
  const navigatecart = () => {
		navigate("/cart");
	};

  return (
    <div className='container'>
      <ToastContainer/>
      <h2 className='checkouthead' style={{ color: "#a11afe", fontWeight: "800", marginTop: "35px", fontSize: "32px", marginBottom: "10px", marginLeft: "40px" }}>Checkout</h2>
      <div className='row'>
        <div className='col-md-8 mt-2' style={{ width: "700px", marginLeft: "35px" }}>
          <div className='card'>
            <div className='card-body'>
              <h4 className='card-title' style={{ color: "#a11afe", fontSize: "20px", fontWeight: "500" }}>Your Order</h4>
              {cart.map((course) => (
                <OrderItem
                  key={course.id}
                  price={course.price}
                  course={course}
                />
              ))}
			   {orderPlaced && (
              <div className="alert alert-success" role="alert">
                Order placed successfully! Thank you for your purchase.
              </div>
            )}
              <div className='cart-total'>
                <p className='card-text' style={{ color: "#4a0777", fontSize: "20px", fontWeight: "500" }}>Total: {total}</p>
              </div>
            </div>
          </div>
          <button
							type='button'
							className='px-6 py-2 border rounded-md mt-3 '
							style={{
								backgroundColor: "#f5ac82",
								color: "white",
								fontSize: "18px",
							}}
             onClick={navigatecart}
							>
							Back to Cart
						</button>
        </div>


        <div className='col-md-4 mt-2'>
          <div className='card'>
            <div className='card-body'>
              <h4 className='card-title' style={{ color: "#a11afe", fontSize: "20px", fontWeight: "500" }}>Shipping Information</h4>
              <form>
                <div className='mb-3'>
                  <label htmlFor='name' className='form-label'>Name</label>
                  <input type='text' id='name' className='form-control' value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className='mb-3'>
                  <label htmlFor='address' className='form-label'>Address</label>
                  <input type='text' id='address' className='form-control' value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div className='mb-3'>
                  <label htmlFor='email' className='form-label'>Email</label>
                  <input type='email' id='email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <button type="button" className='checkoutbtn ' onClick={handlePlaceOrder}>Place Order</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    
    </div>
  );
};

export default Checkout;
