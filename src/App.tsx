import "./App.css";
import { NavMenu } from "./Layout/NavMenu";
import { Breadcrumbs } from "./Layout/Breadcrumbs";
import { RoutesRenderer } from "./Routing/RoutesRenderer";
import { routes } from "./routes";
import { Routes, Route } from 'react-router-dom';
import { Page } from './Layout/Page';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Routing Model Testing</h1>
      </header>
      <main>
        <div style={{ outline: "magenta 6px dashed" }}>
          {/* <NavMenu routes={routes} /> */}
        </div>
        <div style={{ outline: "cyan 6px dashed" }}>
          <Breadcrumbs routes={routes} />
        </div>
        <section>
          <RoutesRenderer routes={routes} />
          {/* <Routes>
            <Route path='/' element={<Page title='home'/>} />
            <Route path='/params/:id' element={<Page title='Params' withOutlet/>}>
              <Route path='sub1' element={<Page title='sub1'/>} />
              <Route path='sub2' element={<Page title='sub2'/>} />
            </Route>
          </Routes> */}
        </section>
      </main>
    </div>
  );
}

export default App;
