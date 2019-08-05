import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Routers from './router'
import store from './store'
import '@/static/css/index.less'

ReactDOM.render(
	<Provider store={store}>
		<Routers />
	</Provider>,
	document.getElementById("app")
)