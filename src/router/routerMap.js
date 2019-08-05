import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

const MyLoadingComponent = ({ isLoading, error }) => {
	if (isLoading) {
			return <div></div>
	}
	else if (error) {
			return <div></div>
	}
	else {
			return null;
	}
};
const News = Loadable({
	loader: () => import('../pages/News'),
	loading: MyLoadingComponent
});
const About = Loadable({
	loader: () => import('../pages/About'),
  loading: MyLoadingComponent
});
class RouterMap extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
        <div className="mainRouter-wraper">
          <Switch>
            <Route  path='/main/News' component={News} />
            <Route  path='' component={About}/>
          </Switch>
        </div>
    )
  }
}

export default RouterMap;