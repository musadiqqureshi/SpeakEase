import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Layout from "@/components/Layout";
import HomePage from "@/pages/home";
import UploadPage from "@/pages/upload";
import ResultsPage from "@/pages/results";
import AboutPage from "@/pages/about";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/upload" component={UploadPage} />
      <Route path="/results" component={ResultsPage} />
      <Route path="/about" component={AboutPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Router />
      </Layout>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
