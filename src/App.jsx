import { createBrowserRouter, createRoutesFromElements, Link, Outlet, Route, RouterProvider } from "react-router-dom";
import Home from "./Home";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PostDetails from "./PostDetails";
import PageNotFound from "./PageNotFound";
import CreatePost from "./CreatePost";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="create-post" element={<CreatePost />} />
      <Route path="post/:id" element={<PostDetails />} />
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
