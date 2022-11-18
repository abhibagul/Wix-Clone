import DesignApp from './designApp';
import LoginPage from './auth/LoginPage/loginPage';
import SignupPage from './auth/signupPage/signupPage';
import ManageWebsites from './manageWebsites/manageWebsites';
import PreviewPage from './previewPage/previewPage';
import WebPage from './web/webPage';
import Homepage from './Homepage/homepage';
import NotFound from './NotFound/notFound'

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { PrivateRoute } from './auth/privateRoute';
import { useContext } from 'react';
import { userDetailsContext } from '../Context/contexts';
function App() {
  let UserDetailsState = useContext(userDetailsContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} exact>

        </Route>
        <Route path="/web/:websiteId/:pageUri" element={<WebPage />} exact>

        </Route>
        <Route path="/my-websites" element={<PrivateRoute />}>
          <Route path="/my-websites" element={<ManageWebsites />}></Route>
        </Route>
        <Route path="/designer" element={<PrivateRoute />}>
          <Route path="/designer/" element={<Navigate to="/my-websites" />}></Route>
        </Route>
        <Route path="/designer/:websiteId/" element={<PrivateRoute />}>
          <Route path="/designer/:websiteId/" element={<Navigate to="/my-websites" />}></Route>
        </Route>
        <Route path="/designer/:websiteId/:pageId" element={<PrivateRoute />}>
          <Route path="/designer/:websiteId/:pageId" element={<DesignApp />}></Route>
        </Route>
        <Route path="/preview/" element={<PrivateRoute />}>
          <Route path="/preview/" element={<DesignApp />}></Route>
        </Route>
        <Route path="/preview/:websiteId/" element={<PrivateRoute />}>
          <Route path="/preview/:websiteId/" element={<DesignApp />}></Route>
        </Route>
        <Route path="/preview/:websiteId/:pageId" element={<PrivateRoute />}>
          <Route path="/preview/:websiteId/:pageId" element={<PreviewPage />}></Route>
        </Route>
        <Route path="/login" element={<LoginPage />} exact></Route>
        <Route path="/signup" element={<SignupPage />} exact></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
