import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PostProvider from './components/PostProvider';
import Posts from './components/Posts';
import NewPost from './components/NewPost';
import ItemPost from './components/ItemPost';
import ChangePost from './components/ChangePost';

function App() {
  const urlEnv = process.env.REACT_APP_URL;

  return (
    <PostProvider url={urlEnv}>
      <Router>
        <div>
          <Switch>
            <Route path="/posts/new" component={NewPost} />
            <Route path="/posts/change/:id" component={ChangePost} />
            <Route path="/posts/:id" component={ItemPost} />
            <Route path="/" component={Posts} />
          </Switch>
        </div>
      </Router>
    </PostProvider>
  );
}

export default App;
