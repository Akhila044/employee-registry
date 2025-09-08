import { createBrowserRouter,RouterProvider } from "react-router-dom"
import Home from "./Components/Home"
import CreateEmployee from "./Components/CreateEmployee"
import ViewEmployee from "./Components/ViewEmployee"
import UpdateEmployee from "./Components/UpdateEmployee"
import PageNotFound from "./Components/PageNotFound"
import "./Styles.css"

let routes=createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/create-employee",
    element:<CreateEmployee/>
  },
  {
    path:"/view-employee/:id",
    element:<ViewEmployee/>
  },
  {
    path:"/update-employee/:id",//step-1 update
    element:<UpdateEmployee/>
  },
  {
    path:"*",
    element:<PageNotFound/>
  }
])

const App = () => {
  return (
    <RouterProvider router={routes}/>
  )
}

export default App