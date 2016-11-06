import React, {Component} from 'react';
import {connect} from 'react-redux';
import {chooseStatus} from '../actions/seat.action';
import {openPopUp} from '../actions/seat.action';
import {cteateNewSeat} from '../actions/seat.action';
import {getPersons, updatePerson} from '../actions/person.action';


class CreateNewSeatComponent extends Component {


    constructor(props) {
        super(props);
        this.state = {value: 'free'};
    }

    //SELECT STATUS - FREE OR OCCUPIED
    chooseStatus(event) {
        this.setState({value: event.target.value});
        this.props.chooseStatus(event.target.value)

    }

    //CLOSE POPUP
    onClose(e) {
        e.preventDefault();
        this.props.openPopUp(false);
        this.refs.title.value = '';

    }

    //CREATE NEW SEAT
    createNewSeat(e) {
        e.preventDefault();

        const title = this.refs.title.value;
        const status = this.state.value;
        const occupant = this.refs.occupant.value.split('#divider#')[0];
        const occupantId = this.refs.occupant.value.split('#divider#')[1] || 'free';


        const seat = {
            title,
            status,
            occupant,
            occupantId,
            x: 0,
            y: 0

        };

        this.props.cteateNewSeat(seat).then(r => {

            if (r.occupantId !== 'free') this.props.updatePerson(r._id, r.occupantId);
        });

        this.props.openPopUp(false);

        this.refs.title.value = '';

    }

    //OPEN POPUP
    openPopUp() {
        this.props.openPopUp(true);
        this.props.getPersons();


    }


    render() {

        const persons = this.props.person.persons.map((person, index) => {
            return (
                <option value={`${person.name} ${person.lastName}#divider#${person._id}`}
                        key={index}>{person.name} {person.lastName}</option>
            )
        });

        return (
            <div className={this.props.auth.login ? '' : 'close'}>

                <button className="btn btn-secondary" onClick={::this.openPopUp}>Create new seat</button>
                <form onSubmit={::this.createNewSeat} className={!this.props.seat.actPopUp ? 'close' : 'create_pop_up'}>
                    <div>
                        <input className="form-control" type="text" ref="title" id="title" required
                               placeholder="Title"/>
                    </div>
                    <div>
                        <input type="radio" onChange={::this.chooseStatus} name="status" value="free" defaultChecked/>
                        Free
                    </div>
                    <div>
                        <input type="radio" onChange={::this.chooseStatus} name="status" value="occupied"/>
                        Occupied
                    </div>
                    <div className={this.props.seat.status == 'free' ? 'close' : ''}>

                        <select className="form-control" ref="occupant" id="occupant">
                            <option value="free">Select</option>
                            {persons}
                        </select>
                    </div>
                    <button className="btn btn-info create_add" type="submit">Add</button>
                    <span className="closePopUp" onClick={::this.onClose}>
                         <i className="fa fa-window-close" aria-hidden="true"></i>
                    </span>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        seat: state.seat,
        person: state.person,
        auth: state.login


    };
}

export default connect(mapStateToProps, {
    chooseStatus,
    openPopUp,
    cteateNewSeat,
    getPersons,
    updatePerson
})(CreateNewSeatComponent);
 
