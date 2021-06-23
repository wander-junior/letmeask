import { BrowserRouter, Route, Switch } from "react-router-dom"

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { Room } from "./pages/Room";

import { AuthContextProvider } from './contexts/AuthContext'

import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

function App() {

  return (
    <>
      <ReactNotification />
      <BrowserRouter>
        <AuthContextProvider>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/rooms/new" component={NewRoom} />
            <Route path="/rooms/:id" component={Room} />
          </Switch>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
