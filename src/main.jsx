import { StrictMode } from 'react'

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentComponent from '../src/Pages/Dashboard/ParticipantDashboard/PaymentComponent'; // path ঠিক মত দিও

import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './Router/router'
import AuthProvider from './Contexts/AuthProvider'
import { Toaster } from 'react-hot-toast'
import { ToastContainer } from 'react-toastify'

// Stripe setup
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';

// Stripe publishable key
// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>

    <Toaster position="top-center" reverseOrder={false} />
  </StrictMode>,
)
