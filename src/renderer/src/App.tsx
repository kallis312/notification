import Dashboard from '@components/Dashboard'
import Login from '@components/Login'
import Setting from '@components/Setting'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'

function App(): JSX.Element {
  return (

    <HashRouter>
      <Routes>
        <Route index element={<Navigate to={'/dashboard'} />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/dashboard'} element={<Dashboard />} />
        <Route path={'/setting'} element={<Setting />} />
      </Routes>
    </HashRouter>
  )
}

export default App
