import "../App.css";
import { NavMenu } from "../Layout/NavMenu/NavMenu";
import { Breadcrumbs } from "./Breadcrumbs";
import { RoutesRenderer } from "../Routing/RoutesRenderer";
import { routes as activeRoutes } from "../routes";
import { routesWithBreadcrumbs } from './routesWithBreadcrumbs';
import { useRoutes } from 'react-router-dom';

function App() {
  const routes = useRoutes(routesWithBreadcrumbs);

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Routing Model Testing with hook</h1>
      </header>
      <main>
        <div style={{ outline: "magenta 6px dashed" }}>
          <NavMenu routes={activeRoutes} />
        </div>
        <div style={{ outline: "cyan 6px dashed" }}>
          <Breadcrumbs routes={routesWithBreadcrumbs} />
        </div>
        <section>
          <RoutesRenderer routes={routesWithBreadcrumbs} />
        </section>
      </main>
    </div>
  );
}

export default App;
