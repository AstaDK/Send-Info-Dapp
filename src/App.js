import './App.css';
import HomeComponent from './components/home/home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import UserComponent from './components/user/user';
import UserAccountProvider from './contexts/account';
import ContractAliceProvider from './contexts/contract-alice';

function App() {
  return (
    <div className="App">
      <UserAccountProvider>
        <ContractAliceProvider>
          <Router>
            <Switch>
              <Route exact path="/" render={(props) => <HomeComponent {...props} />} />
              <Route exact path="/user" render={(props) => <UserComponent {...props} />} />
            </Switch>
          </Router>
        </ContractAliceProvider>
      </UserAccountProvider>
    </div>

  );
}

export default App;
