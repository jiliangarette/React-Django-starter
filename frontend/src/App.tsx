import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import AboutPage from "./pages/AboutPage";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/post/:id" element={<PostPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </main>
          <footer className="border-t py-4 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Django React Boilerplate
          </footer>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
