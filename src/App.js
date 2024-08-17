import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';


const App = ()=> {
  const [apiKey,setapiKey]=useState(process.env.REACT_APP_NEWS_API)
  const [progress,setProgress] = useState(0)
    return (
      <div>
        <Router>
        <Navbar/>
        <LoadingBar
        color='#f11946'
        height={3}
        progress={progress}
      />

        {/* <News pageSize={5} category='science'/> */}
        <Switch>
          <Route exact path="/"><News setProgress={setProgress} apiKey={apiKey}  pageSize={5} key='general' category='general'/></Route>
          <Route exact path="/entertainment"><News setProgress={setProgress} apiKey={apiKey}  pageSize={5} key='entertainment' category='entertainment'/></Route>
          <Route exact path="/business"><News setProgress={setProgress} apiKey={apiKey}  pageSize={5} key='business' category='business'/></Route>
          <Route exact path="/health"><News setProgress={setProgress} apiKey={apiKey}  pageSize={5} key='health' category='health'/></Route>
          <Route exact path="/science"><News setProgress={setProgress} apiKey={apiKey}  pageSize={5} key='science' category='science'/></Route>
          <Route exact path="/technology"><News setProgress={setProgress} apiKey={apiKey}  pageSize={5} key='technology' category='technology'/></Route>
          <Route exact path="/sports"><News setProgress={setProgress} apiKey={apiKey}  pageSize={5} key='sports' category='sports'/></Route>
        </Switch>
        </Router>
      </div>
    )
}

export default App

