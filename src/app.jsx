import styles from './app.module.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login/login';
import Dashboard from './components/dashboard/dashboard';
import Register from './components/register/register';
import SelectTravel from './components/select_travel/select_travel';

const App = ({ authService, travelRepository }) => {
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
          <Route
            exact
            path="select"
            element={
              <SelectTravel
                authService={authService}
                travelRepository={travelRepository}
              />
            }
          />
          <Route path="travel/:travelId" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
