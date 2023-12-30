import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client = {queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} position='bottom-right' panelPosition='right'/>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);