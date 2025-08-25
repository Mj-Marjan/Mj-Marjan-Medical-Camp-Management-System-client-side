import { createBrowserRouter } from "react-router";
import MainLayouts from "../layouts/MainLayouts";
import Home from "../Home/Home";
import AvailableCamps from "../Pages/AvailableCamps/AvailableCamps";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import SelectRole from "../Pages/Dashboard/SelectRole/SelectRole";
import OrganizerProfile from "../Pages/Dashboard/OrganizerDashboard/OrganizerProfile";
import AddCamp from "../Pages/Dashboard/OrganizerDashboard/AddCamp";
import ManageCamps from "../Pages/Dashboard/OrganizerDashboard/ManageCamps";
// import OrganizerDashboard from "../Pages/Dashboard/OrganizerDashboard/OrganizerDashboard";
import ManageRagisterCamps from "../Pages/Dashboard/ParticipantDashboard/ManageRagisterCamps";
// import ParticipantDashboard from "../Pages/Dashboard/ParticipantDashboard/ParticipantDashboard";
import Dashboard from "../Pages/Dashboard/Dashboard";
import PrivetRouts from "./PrivetRouts";
import ParticipantProfile from "../Pages/Dashboard/ParticipantDashboard/ParticipantProfile";
import CampDetails from "../Pages/CampDetails/CampDetails";
import UpdateCamp from "../Pages/Dashboard/OrganizerDashboard/UpdateCamp";
import OrganizerDashboard from "../Pages/Dashboard/OrganizerDashboard/ManagementDashboard/OrganizerDashboard";
import { Elements } from "@stripe/react-stripe-js";
import PaymentComponent from "../Pages/Dashboard/ParticipantDashboard/PaymentComponent";

import { loadStripe } from "@stripe/stripe-js";
import Feedback from "../Pages/Feedback/Feedback";
import FeedbackAndRatings from "../Components/FeedbackAndRatings/FeedbackAndRating";
import Analytics from "../Pages/Dashboard/ParticipantDashboard/Analytics";
import PaymentHistory from "../Pages/Dashboard/ParticipantDashboard/PaymentHistory";
import MedicalTips from "../Components/MedicalTips/MedicalTips";
import TeamSlider from "../Pages/Team/TeamSlider";
import FaqSection from "../Pages/FaqSection/FaqSection";
import ContactSection from "../Pages/ContactSection";

// Stripe publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    children: [
      {
        path: "/",
         loader: () => fetch("https://medical-camp-server-liart.vercel.app/camps"),
        element: <Home />
      },
      {
        path: "/camps",
        loader: () => fetch("https://medical-camp-server-liart.vercel.app/camps"),
        element: <AvailableCamps />
      },
      {
        path: "/contactSection",
        element:<ContactSection></ContactSection>
      },
      {
        path: "/camps/:id",
        loader: ({ params }) => fetch(`https://medical-camp-server-liart.vercel.app/camps/${params.id}`),
        element: <PrivetRouts><CampDetails></CampDetails></PrivetRouts>
      },
      {
        path: "/update-camp/:id",
        loader: ({ params }) => fetch(`https://medical-camp-server-liart.vercel.app/camps/${params.id}`),
        element: <PrivetRouts><UpdateCamp></UpdateCamp></PrivetRouts>
      },
      {
        path: "/madicleTips",
        element: <MedicalTips></MedicalTips>
      },
      {
        path: "/teamSlider",
        element:<TeamSlider></TeamSlider>
      },
      {
        path: "/faq",
        element:<FaqSection></FaqSection>
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/select-role",
        element: <SelectRole />
      },
      {
        path: "/dashboard",
        element: (
          <PrivetRouts>
            <Dashboard></Dashboard>
          </PrivetRouts>
        ),
        children: [
          // Organizer routes
          {
            path: "organizer-profile",
            element: <OrganizerProfile />
          },
          {
            path: "add-camp",
            element: <AddCamp />
          },
          {
            path: "manage-camps",
            element: <ManageCamps />
          },
          {
            path: "organizer",
            loader: () => fetch("https://medical-camp-server-liart.vercel.app/registrations"),
            element: <OrganizerDashboard />
          },

          // Participant routes
          {
            path: "manage-ragister-camps",
            loader: () => fetch("https://medical-camp-server-liart.vercel.app/registrations"),
            element: <ManageRagisterCamps />
          },
          {
            path: "/dashboard/payment/:id",
            loader: ({ params }) => fetch(`https://medical-camp-server-liart.vercel.app/registrations/${params.id}`),
            element: <Elements stripe={stripePromise}> <PaymentComponent></PaymentComponent> </Elements>
          },
          {
            path:"/dashboard/feedback/:id",
            element:<PrivetRouts><Feedback></Feedback></PrivetRouts>
          },
          {
            path: "/dashboard/feedback-and-ratings/:campId",
            element:<FeedbackAndRatings></FeedbackAndRatings>
          },
          {
            path: "participant-profile",
            element: <ParticipantProfile></ParticipantProfile>
          },
          {
            path: "/dashboard/analytics",
            element: <Analytics></Analytics>
          },
          {
            path: "payment-history",
            element: <PaymentHistory />
          }
        ]
      }
    ]
  }
]);
