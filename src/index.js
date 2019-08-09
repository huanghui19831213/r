import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Routers from './router'
import {persistor,store} from './store'
import {PersistGate} from 'redux-persist/lib/integration/react';
import '@/static/css/index.less'
import '@/static/css/iconfont/iconfont.css'

ReactDOM.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<Routers />
		</PersistGate>
	</Provider>,
	document.getElementById("app")
)