import React from 'react'
import { BrowserRouter as Router , Route } from 'react-router-dom'
import Add from './Add'
import Edit from './Edit'
import Home from './Home'
export default function MainComponent() {
    return (
<Router>
    <Route exact path="/" component={Home} />
    <Route exact path="/add" component={Add} />
    <Route exact path="/edit/:id" component={Edit} />
</Router>
    )
}
