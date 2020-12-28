import React, { useEffect, useState } from "react";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import NavigationItems from "./Navigation/NavigationItems";
import "./App.css";
import ScrumScreen from "./ScrumScreen/ScrumScreen";
import Login from "./Login/Login";
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

const App = (props) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userName, setUserName] = useState(null);
  const [scrumKey, setscrumKey] = useState(null);

  useEffect(()=>{
    setUserName('');
    setscrumKey('');
  },[isAuth])
  return (
    <>
      <header className="Toolbar">
        <nav className="DekstopOnly">
          <NavigationItems isAuth={isAuth} setIsAuth={setIsAuth}/>
        </nav>
      </header>
      <div className="screen">
        {isAuth ? (
          <Switch>
            <Route path="/scrum" exact render={()=><ScrumScreen userName={userName} scrumKey={scrumKey}/>} />
            <Redirect to="/scrum" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/login" exact render={()=><Login
            setIsAuth={setIsAuth}
            userName={userName}
            setUserName={setUserName}
            scrumKey={scrumKey}
            setscrumKey={setscrumKey}
          />} />
          <Redirect to="/login" />
          </Switch>
          
        )}
      </div>
    </>
  );
};

export default App;
