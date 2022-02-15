import "./App.css";
import { NavMenu } from "./Layout/NavMenu";
import { Breadcrumbs } from "./Layout/Breadcrumbs";
import { RoutesRenderer } from "./Routing/RoutesRenderer";
import { routes } from "./routes";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Routing Model Testing</h1>
      </header>
      <main>
        <div style={{ outline: "magenta 6px dashed" }}>
          <NavMenu routes={routes} />
        </div>
        <div style={{ outline: "cyan 6px dashed" }}>
          <Breadcrumbs routes={routes} />
        </div>
        <section>
          <RoutesRenderer routes={routes} />
        </section>
      </main>
    </div>
  );
}

export default App;
