import React, { Component }  from 'react'
import ReactDOM,{ render } from 'react-dom'
import { createStore,combineReducers, applyMiddleware } from 'redux'
import App from './components/App';
import VisibleCards from './components/VisibleCards'
import Sidebar from './components/Sidebar';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import * as reducers from './reducers';
import thunkMiddleware from 'redux-thunk';
reducers.routing=routerReducer;

//import * as localStore from './localStore';
import NewCardModal from './components/NewCardModal';
import EditCardModal from './components/EditCardModal';
import StudyModal from './components/StudyModal';

import {fetchData} from './actions';
// const store=createStore(function(state,action){
// 	switch(action.type){
// 		case 'ADD_CARD':
// 			let newCard=Object.assign({},action.data,{
// 				score:1,
// 				id:+new Date
// 			});
// 			return Object.assign({},state,{
// 				cards:state.cards ? state.cards.concat([newCard]) : [newCard]
// 			});
// 		default:
// 			return state || {cards:[]};  
// 	}
// }); 

//add decks
//show add deck
//hide add deck
  

 // decks={state.decks}
 // addingDeck={state.addingDeck}

 // addDeck={name=> store.dispatch(addDeck(name))}
 // showAddDeck={()=> store.dispatch(showAddDeck())}
 // hideAddDeck={()=> store.dispatch(hideAddDeck())}






// const store=createStore(combineReducers({
// 	cards,
// 	decks,
// 	addingDeck
// }));

const store=createStore(combineReducers(reducers),applyMiddleware(thunkMiddleware));
const history=syncHistoryWithStore(browserHistory,store);

// store.subscribe(()=>{
// 	console.log(store.getState());
// });

// store.dispatch({
// 	type:'ADD_CARD',
// 	data: {
// 		front:'front',
// 		back:'back'
// 	}
// });

// store.dispatch({
// 	type:'ADD_CARD',
// 	data: {}
// });




const routes=(

	<Route path='/' component={App}>
		<Route path='/deck/:deckId' component={VisibleCards}>
			<Route path='/deck/:deckId/new' component={NewCardModal}/>
			<Route path='/deck/:deckId/edit/:cardId' component={EditCardModal}/>
			<Route path='/deck/:deckId/study' component={StudyModal}/>
		</Route>
	</Route>

);

function run(){ 
	let state=store.getState();
	//localStore.set(state,['decks','cards']);

	//console.log(state);
	render(<Provider store={store}>
		<Router history={history}>
			{routes}
		</Router>
		
	</Provider>,document.getElementById('root'));
}

function save(){
	var state=store.getState();
	fetch('/api/data',{
		method:'POST',
		headers:{
			Accept:'application/json',
			'Content-Type':'application/json'
		},
		body:JSON.stringify({
			decks:state.decks,
			cards:state.cards
		})
	})
}



function init(){
	
	run();
	store.subscribe(run);	 
	store.subscribe(save);
	store.dispatch(fetchData()); 

}

init();







// window.show=()=>store.dispatch(showAddDeck());
// window.hide=()=>store.dispatch(hideAddDeck());
// window.add=()=>store.dispatch(addDeck(new Date().toString()));
