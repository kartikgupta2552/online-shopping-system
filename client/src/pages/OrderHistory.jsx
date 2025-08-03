import React from 'react';
import MyNavbar from './../components/MyNavbar';
import HeadPhoneImg from './../assets/headphones.jpg'
const orders = [
  {
    id: 1,
    title: 'Umbrella',
    quantity: 2,
    price: 50,
    total: 100,
    date: '2 Feb 2025',
    image: HeadPhoneImg ,
  },
  {
    id: 2,
    title: 'Jug',
    quantity: 5,
    price: 10,
    total: 50,
    date: '5 Feb 2024',
    image: HeadPhoneImg,
  },
  {
    id: 3,
    title: 'Jug',
    quantity: 5,
    price: 10,
    total: 50,
    date: '5 Feb 2024',
    image: HeadPhoneImg,
  },
];

const OrderHistory = () => {
  return (


    <div className="container my-5">
    <MyNavbar/>

      <h2 className="text-center mb-4 mt-4">🧾 Previous Orders </h2>

      {orders.map((order) => (
        <div
          key={order.id}
          className="card mb-4 shadow-sm p-3 border-0 rounded "
        >
          <div className="row g-3 align-items-center">
            <div className="col-auto">
              <img
                src={order.image}
                alt={order.title}
                className="img-fluid rounded"
                style={{ width: '120px', height: '120px', objectFit: 'cover' }}
              />
            </div>
            <div className="col">
              <h5 className="mb-1">Title: {order.title}</h5>
              <p className="mb-1">Quantity: {order.quantity}</p>
              <p className="mb-1">Price: ₹{order.price}</p>
              <p className="mb-1 fw-bold">Total Amount: ₹{order.total}</p>
              <p className="mb-0 text-muted">Order Date: {order.date}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
