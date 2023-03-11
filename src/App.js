import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";

//Pages
import CreateACampaign from "./pages/CreateACampaign";
import AllCampaigns from "./pages/AllCampaigns";
import Mission from "./pages/Mission";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<RootLayout />}
      errorElement={
        <>
          <Navbar />
        </>
      }
    >
      <Route index element={<Index />} />
      <Route path="new_campaign" element={<CreateACampaign />} />
      <Route path="campaigns" element={<AllCampaigns />} />
      <Route path="mission" element={<Mission />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
