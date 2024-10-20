import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import { store } from './redux/store'
import App from './App.jsx'
import './assets/scss/main.css'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
