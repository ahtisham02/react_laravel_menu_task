import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import TreeView from './Tree.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <TreeView />
    </ChakraProvider>
  </React.StrictMode>,
)
