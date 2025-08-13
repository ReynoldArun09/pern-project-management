import { BrowserRouter, Routes, Route } from "react-router-dom"
import { authenticationRoutePaths } from "./common/routes"

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          {authenticationRoutePaths.map((route) => (
            <Route path={route.path} key={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
