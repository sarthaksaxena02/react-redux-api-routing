import React from 'react';
import Sidebar from './Sidebar';
import {connect} from 'react-redux';
import Toolbar from './Toolbar';

// const App=(props) =>{
// 	return(<div className='app'>
// 		<Sidebar />
// 		{props.children}
// 		</div>);
// };

const mapStateToProps= (props, { params: { deckId } }) =>({
	deckId
})

const App=({deckId,children})=>{
	return(
		<div className='app'>
			<Toolbar deckId={deckId}/>
			<Sidebar/>				
			{children}
		</div>
	);
}


export default connect(mapStateToProps)(App);


// <h1>deck {deckId}</h1>