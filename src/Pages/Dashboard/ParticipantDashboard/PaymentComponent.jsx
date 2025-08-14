import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router";

const PaymentComponent = () => {
  const campData = useLoaderData();
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false); // নতুন state

  useEffect(() => {
    axios
      .post("https://medical-camp-server-liart.vercel.app/create-payment-intent", {
        fees: campData.fees,
      })
      .then((result) => {
        setClientSecret(result.data.clientSecret);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error creating payment intent:", err);
        Swal.fire("Error", "Failed to initialize payment.", "error");
      });
  }, [campData.fees]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    if (processing) return; // prevent double submission
    setProcessing(true);

    const card = elements.getElement(CardElement);
    if (!card) {
      Swal.fire("Error", "Card information not found.", "error");
      setProcessing(false);
      return;
    }

    const { error: paymentMethodError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card,
        billing_details: {
          name: campData.participantName || "Anonymous",
          email: campData.participantEmail,
        },
      });

    if (paymentMethodError) {
      Swal.fire("Error", paymentMethodError.message, "error");
      setProcessing(false);
      return;
    }

    const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
    });

    if (confirmError) {
      Swal.fire("Error", confirmError.message, "error");
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      const paymentInfo = {
        campId: campData.campId,
        email: campData.participantEmail,
        campName: campData.campName,
        transactionId: paymentIntent.id,
        amount: campData.fees,
        date: new Date().toISOString(),
      };

      try {
        const res = await axios.post("https://medical-camp-server-liart.vercel.app/payments", paymentInfo);
        if (res.data.insertedId) {
          const updateRes = await axios.patch(
            `https://medical-camp-server-liart.vercel.app/registrations/${campData._id}`,
            {
              paymentStatus: "paid",
            }
          );
          if (updateRes.data.modifiedCount > 0) {
            Swal.fire("Success", "Payment successful and status updated!", "success");
          } else {
            Swal.fire("Warning", "Payment saved but status not updated!", "warning");
          }
        } else {
          Swal.fire("Warning", "Payment done but not saved!", "warning");
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Payment save or update failed!", "error");
      }
    }

    setProcessing(false); // শেষ হলে false করে দিবে
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">
        Pay for {campData.campName || "this camp"}
      </h2>
      <form onSubmit={handleSubmit}>
        <CardElement className="border p-4 mb-4" />
        <button
          type="submit"
          disabled={!stripe || !clientSecret || processing}
          className={`bg-blue-500 text-white px-4 py-2 rounded ${
            processing ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {processing ? "Processing..." : `Pay $${campData.fees}`}
        </button>
      </form>
    </div>
  );
};

export default PaymentComponent;
