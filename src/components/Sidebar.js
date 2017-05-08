import React, { Component }  from 'react'
import ReactDOM,{ render } from 'react-dom'
import { connect } from 'react-redux'
import { addDeck,showAddDeck,hideAddDeck} from '../actions'
import {Link} from 'react-router'


const mapStateToProps=({decks,addingDeck})=>({
		decks,
 		addingDeck
});

const mapDispatchToProps=dispatch=>({
	addDeck:name => dispatch(addDeck(name)),
	showAddDeck: ()=>dispatch(showAddDeck()),
	hideAddDeck: ()=>dispatch(hideAddDeck())
});

class Sidebar extends Component{
	componentDidUpdate(){
		var el=ReactDOM.findDOMNode(this.refs.add);
		if(el)
			el.focus();
	};
	render(){
		let props=this.props;

		const createDeck=evt=>{
			if(evt.which !== 13)
				return;
			var valueInput=ReactDOM.findDOMNode(this.refs.add).value;
			this.props.addDeck(valueInput);
			this.props.hideAddDeck();
		};		
		return(<div className="sidebars">
			<h2>All decks</h2>
			<ul>
				{props.decks.map((deck,i)=>
					 <li key={i}>
					 	<Link to={`/deck/${deck.id}`}>
					 	{deck.name}
					 	</Link>
					 </li>
				)}
			</ul>	
			{props.addingDeck && <input ref='add' onKeyPress={createDeck}/>}
			</div>
		);
	}
	
};

export default connect(mapStateToProps,mapDispatchToProps)(Sidebar);
