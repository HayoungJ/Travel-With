import styles from './app.module.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login/login';
import Dashboard from './components/dashboard/dashboard';
import Register from './components/register/register';

const App = ({ authService }) => {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login authService={authService} />} />
          <Route
            exact
            path="/register"
            element={<Register authService={authService} />}
          />
          <Route path="travel">
            <Route path=":travelId" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
