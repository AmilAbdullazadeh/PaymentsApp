import React from "react";
import ReactDOM from "react-dom";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

toast.configure();

function App() {
  const [product] = React.useState({
    name: "Tesla Roadster",
    price: 649555.68,
    description: "Road car"
  });

  async function handleToken(token, addresses) {
    const res = await axios.post(
      "https://ry7v05l6on.sse.codesandbox.io/checkout",
      { token, product }
    );
    const { status } = res.data;
    console.log("Response: ", res.data);
    if (status === "success") {
      toast("Success! Check email for details", { type: "success" });
    } else {
      toast("Something went wrong", { type: "error" });
    }
  }

  return (
    <div className="container">
      <div className="product">
        <h1>{product.name}</h1>
        <h3>On sale - ${product.price}</h3>
      </div>
      <StripeCheckout
        token={handleToken}
        stripeKey='pk_test_UN3KIGzjYGcke2sO4yomM6C800hzbfqmPd'
        amount={product.price * 100}
        name={product.name}
        billingAddress
        shippingAddress
      />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
