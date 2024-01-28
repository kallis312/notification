import Dashboard from '@components/Dashboard'
import Login from '@components/Login'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'

function App(): JSX.Element {
  return (

    <HashRouter>
      <Routes>
        <Route index element={<Navigate to={'/login'} />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/dashboard'} element={<Dashboard />} />
      </Routes>
    </HashRouter>
  )
}

export default App
