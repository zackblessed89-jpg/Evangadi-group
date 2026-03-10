import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import "./App.css";

// Global Components
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Loader from "./Components/Loader/Loader";

// Pages
import Home from "./Pages/Home/Home";
import Landing from "./Pages/Landing/Landing";
import AskQuestion from "./Pages/AskQuestion/AskQuestion";
import QuestionDetail from "./Pages/QuestionDetail/QuestionDetail";
import Settings from "./Pages/Settings/Settings";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import NotFound from "./Pages/NotFound/NotFound";
import AnswerForm from "./features/answers/AnswerForm/AnswerForm";

function App() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Header />

      <main className="content-container">
        <Routes>
          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ask"
            element={
              <ProtectedRoute>
                <AskQuestion />
              </ProtectedRoute>
            }
          />
          <Route
            path="/question/:questionId"
            element={
              <ProtectedRoute>
                <QuestionDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/AnswerForm"
            element={
              <ProtectedRoute>
                <AnswerForm />
              </ProtectedRoute>
            }
          />

          {/* Public Routes */}
          <Route path="/login" element={<Landing />} />
          <Route path="/register" element={<Landing />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
