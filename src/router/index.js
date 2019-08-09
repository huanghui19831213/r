import React from 'react'
import { connect } from 'react-redux';
import {
	HashRouter,
	Route,
	Switch,
	Redirect ,
	withRouter 
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
		console.log(this.props.data,283847)
		return (
			<HashRouter>
				<Switch>
					<Route path='/' exact render={()=> (<Redirect to="/Login"/> )}/>
					<Route path="/Login" component={Login} />
					<Route path="/Home" component={Home} />
					<Route path="/main" component={this.props.data.length==0?Noffind:Layout} />
          <Route  path='*' component={Noffind}/>
				</Switch>
			</HashRouter>
		)
	}
}
const mapStateToProps = (state) => ({
	data: state.menuList
})

const mapDispatchToProps = (dispatch) => ({
	// setMenu: (value) => {
	// 		dispatch(setMenuList(value))
	// }
})

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RootRouter))
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RootRouter)