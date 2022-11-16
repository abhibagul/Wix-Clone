import DesignApp from './designApp';
import LoginPage from './auth/LoginPage/loginPage';
import SignupPage from './auth/signupPage/signupPage';
import ManageWebsites from './manageWebsites/manageWebsites';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { PrivateRoute } from './auth/privateRoute';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Homepage</h1>} exact>

        </Route>
        <Route path="/my-websites" element={<PrivateRoute />}>
          <Route path="/my-websites" element={<ManageWebsites />}></Route>
        </Route>
        <Route path="/designer" element={<PrivateRoute />}>
          <Route path="/designer/" element={<DesignApp />}></Route>
        </Route>
        <Route path="/designer/:websiteId/:pageId" element={<PrivateRoute />}>
          <Route path="/designer/:websiteId/:pageId" element={<DesignApp />}></Route>
        </Route>
        <Route path="/login" element={<LoginPage />} exact></Route>
        <Route path="/signup" element={<SignupPage />} exact></Route>
      </Routes>
    </Router>
  );
}

export default App;
