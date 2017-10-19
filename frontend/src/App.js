import React, { Component } from 'react';
import Main from './containers/Main'
import PostDetails from './containers/PostDetails'
import EditPost from './components/EditPost'
import EditComment from './components/EditComment'
import CreatePost from './components/CreatePost'
import CreateComment from './components/CreateComment'
import { Route, Switch} from 'react-router-dom'
import './index.css'

class App extends Component {
  render() {
    return (
      <div>
        <Switch>

        <Route exact path='/' component={Main}/>
        <Route exact path='/newPost' component= {CreatePost}/>
        <Route exact  path='/:category/edit/:id'  component={EditPost}/>
        <Route  exact path='/:category'  component={Main}/>
        <Route  exact path='/:category/posts/:id'  component={PostDetails}/>
        <Route  exact path='/:category/posts/:id/comment/new'  component={CreateComment}/>
        <Route  exact  path='/:category/posts/:id/comment/edit/:id'  component={EditComment}/>
        </Switch>

      </div>
    );
  }
}

export default App;
