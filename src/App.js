import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import HomePage from "./components/HomePage";
import GetStartPage from "./components/GetStartPage";
import { Provider } from "react-redux";
import { Store } from "./store/Store";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GetStartPage />} />
          <Route path="/loginform" element={<LoginForm />} />
          <Route path="/signupform" element={<SignUpForm />} />
          <Route
            path="/homepage"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
