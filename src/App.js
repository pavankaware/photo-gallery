import React from 'react';
import './App.css';
import PhotoGallery from 'Components/PhotoGallery/PhotoGallery';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import "bootstrap/dist/css/bootstrap.min.css";

// initialize the query client with default options 
const queryClient = new QueryClient(
  {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  }
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
          <PhotoGallery />
      </div>
    </QueryClientProvider>
  );
}

export default App;
