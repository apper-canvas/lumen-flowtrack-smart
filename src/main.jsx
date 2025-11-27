import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "@/store"
import App from "@/App"
import "@/index.css"
import { RouterProvider } from "react-router-dom"
import { router } from "@/router"
import "@/index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
)