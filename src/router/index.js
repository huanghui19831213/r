import React from 'react'
import {
	HashRouter,
	Route,
	Switch
  } from 'react-router-dom';
import Loadable from 'react-loadable';

const MyLoadingComponent = ({ isLoading, error }) => {
	if (isLoading) {
			return <div>Loading...</div>
	}
	else if (error) {
			return <div>Sorry, there was a problem loading the page.</div>
	}
	else {
			return null;
	}
};
import Layout from '../containers/Layout'
const Home = Loadable({
	loader: () => import('../pages/Home'),
	loading: MyLoadingComponent
});

const Noffind = Loadable({
	loader: () => import('../pages/404'),
	loading: MyLoadingComponent
});

const Login = Loadable({
	loader: () => import('../pages/Login'),
	loading: MyLoadingComponent
});
class RootRouter extends React.Component{
	render(){
		return (
			<HashRouter>
				<Switch>
					<Route path="/Login" component={Login} />
					<Route path="/Home" component={Home} />
					<Route path="/main" component={Layout} />
          <Route  path='*' component={Noffind}/>
				</Switch>
			</HashRouter>
		)
	}
}


export default RootRouter;
