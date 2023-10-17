import { Toaster } from "react-hot-toast";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";

import "./App.css";
import { Home, Post, Posts } from "./pages";
import { Suspense } from "react";
import { Login } from "./components";
import ProtectedRoute from "@/routes/ProtectedRoutes";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import _socket from "@helpers/socket";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/posts",
    element: (
      <ProtectedRoute>
        <Posts />
      </ProtectedRoute>
    ),
  },
  {
    path: "/post",
    element: (
      <ProtectedRoute>
        <Post />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Toaster />
            <RouterProvider router={router}></RouterProvider>
          </PersistGate>
        </Provider>
      </Suspense>
    </>
  );
}

export default App;
