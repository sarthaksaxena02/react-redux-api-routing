import CardModal from './CardModal';
import { connect } from 'react-redux';
import {addCard} from '../actions';

const mapStateToProps= (props,{params:{deckId}}) => ({
	card: {deckId}
});

const mapdispatchToProps =dispatch => ({
	onSave:card =>dispatch(addCard(card))
});

export default connect(mapStateToProps,mapdispatchToProps)(CardModal);

