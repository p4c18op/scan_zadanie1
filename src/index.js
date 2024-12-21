import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Store from './history_bd/history_bd';
import { BrowserRouter } from 'react-router-dom';

const store = new Store();

export const Context = createContext({
	store,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Context.Provider
		value={{
			store,
		}}
	>
		<React.StrictMode>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</React.StrictMode>
	</Context.Provider>
);

reportWebVitals();
