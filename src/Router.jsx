import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "./App";
import Layout from "./Layout";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductProfileStripe";
import Login from "./pages/Login";
import ProductList from "./pages/Products";
import Brands from "./pages/Brands";
import { CheckoutForm, Return } from "./pages/Checkout";


const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="ThreadAndThrottle" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="products" element={<ProductList />}/>
        <Route path="products/:id" element={<ProductPage />} />
        <Route path="brands" element={<Brands />} />
        <Route path="login" element={<Login />} />
        <Route path="checkout" element={<CheckoutForm/>} />
        <Route path="return" element={<Return/>} />

      </Route>
    )
  );

  return <RouterProvider router={router} />;
};
export default Router;
