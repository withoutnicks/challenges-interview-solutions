import {Route, Switch} from "wouter";

import {ControllerPage} from "./pages/ControllerPage";
import {MonitorPage} from "./pages/MonitorPage";

function App() {
  return (
    <Switch>
      <Route component={ControllerPage} path="/" />

      <Route component={MonitorPage} path="/monitor" />

      <Route>404: No such page!</Route>
    </Switch>
  );
}

export default App;
