import React, { useState } from 'react';

const paymentOptions = [
  'Credit / Debit Card',
  'UPI',
  'Netbanking',
  'Pluxee',
  'Wallet',
  'Cash on Delivery'
];

const Payment = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const renderPaymentDetails = () => {
    if (!selectedOption) return null;

    switch (selectedOption) {
      case 'Credit / Debit Card':
        return (
          <div>
            <label>Card Number</label>
            <input className="form-control mb-2" placeholder="XXXX-XXXX-XXXX-XXXX" />
            <label>Expiry</label>
            <input className="form-control mb-2" placeholder="MM/YY" />
            <label>CVV</label>
            <input className="form-control mb-2" placeholder="XXX" />
          </div>
        );
      case 'UPI':
        return <input className="form-control" placeholder="Enter UPI ID" />;
      case 'Netbanking':
        return (
          <select className="form-control">
            <option>Select Bank</option>
            <option>HDFC</option>
            <option>ICICI</option>
            <option>SBI</option>
          </select>
        );
      case 'Pluxee':
        return <input className="form-control" placeholder="Enter Pluxee ID" />;
      case 'Wallet':
        return <input className="form-control" placeholder="Enter Wallet ID / Mobile" />;
      case 'Cash on Delivery':
        return <p className="text-muted">You will pay on delivery.</p>;
      default:
        return null;
    }
  };

  return (
  
    <div className="container mt-5 ">
      <h2 className="text-center mb-4">Payment Design</h2>
      <div className="row row-cols-1 row-cols-md-3 g-3">
    

        {paymentOptions.map((option, index) => (
          <div className="col" key={index}>
            <button
              className={`btn w-100 ${selectedOption === option ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setSelectedOption(option)}
            >
              {option}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-light border rounded">
        {selectedOption ? (
          <>
            <h5 className="mb-3">Enter details for: {selectedOption}</h5>
            {renderPaymentDetails()}
          </>
        ) : (
          <h3 className="text-muted">Select a payment method to enter details.</h3>
        )}
      </div>
    </div>
  );
};

export default Payment;
