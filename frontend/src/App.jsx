import React, { useContext, useEffect, useState } from "react";
import AuthContext from "./context/AuthContext";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import HomePage from "./components/Home/Home";
const ProductSearch = React.lazy(
  () => import("./components/Product-Search/Product-Search"),
);
const UserAccount = React.lazy(
  () => import("./components/Account/UserAccount"),
);
const PostAd = React.lazy(() => import("./components/Post_ad/PostAd"));
const AboutUs = React.lazy(() => import("./components/About_us/AboutUs"));
const ProductDetails = React.lazy(
  () => import("./components/Product_Details/ProductDetails"),
);
const Blog = React.lazy(() => import("./components/Blog/Blog"));
const BlogDetails = React.lazy(() => import("./components/Blog/BlogDetails"));

const LoginSignup = React.lazy(
  () => import("./components/Account/LoginSignup"),
);
const TermsAndConditions = React.lazy(
  () => import("./components/Support/TermsAndConditions"),
);
const FAQ = React.lazy(() => import("./components/Support/faq"));
const HelpCenter = React.lazy(() => import("./components/Support/HelpCenter"));
const PrivacyPolicy = React.lazy(
  () => import("./components/Support/PrivacyPolicy"),
);
const Contact = React.lazy(() => import("./components/Contact/Contact"));
const ChatPage = React.lazy(() => import("./components/Chat/ChatPage"));
const ChatList = React.lazy(() => import("./components/Chat/ChatList"));
import FloatingAIChat from "./components/FloatingAIChat/FloatingAIChat";

const App = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("current_theme") || "light",
  );
  const { user, isAuthenticated, setUser } = useContext(AuthContext);

  useEffect(() => {
    localStorage.setItem("current_theme", theme);
  }, [theme]);

  return (
    <Router>
      <div
        className={`container ${theme}`}
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Navbar
          theme={theme}
          setTheme={setTheme}
          isAuthenticated={isAuthenticated}
          setUser={setUser}
        />
        <div style={{ flex: 1 }}>
          <React.Suspense
            fallback={
              <div role="status" style={{ padding: 48 }}>
                Loading page…
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<ProductSearch />} />
              <Route
                path="/postAd"
                element={
                  isAuthenticated ? (
                    <PostAd />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route path="/about" element={<AboutUs />} />
              <Route
                path="/chatlist"
                element={
                  isAuthenticated ? (
                    <ChatList />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/chat/:chatId"
                element={
                  isAuthenticated ? (
                    <ChatPage />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route path="/productdetails/:id" element={<ProductDetails />} />
              <Route path="/blog" element={<Blog themeMode={theme} />} />
              <Route path="/blog/:id" element={<BlogDetails />} />
              <Route
                path="/PostBlog"
                element={<Navigate to="/blog" replace />}
              />
              <Route path="/Contact" element={<Contact />} />
              <Route
                path="/terms-and-conditions"
                element={<TermsAndConditions />}
              />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/help-center" element={<HelpCenter />} />
              <Route path="/faq" element={<FAQ />} />
              <Route
                path="/account"
                element={
                  isAuthenticated ? (
                    <UserAccount user={user} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route path="/login" element={<LoginSignup />} />
              <Route
                path="*"
                element={
                  <div style={{ padding: 60, textAlign: "center" }}>
                    <h1>Page not found</h1>
                    <a href="/">Return to Green Gadgets</a>
                  </div>
                }
              />
            </Routes>
          </React.Suspense>
        </div>
        <Footer />
        <FloatingAIChat />
      </div>
    </Router>
  );
};

export default App;
