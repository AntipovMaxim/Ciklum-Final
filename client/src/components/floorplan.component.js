import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Draggable, {DraggableCore} from 'react-draggable';
import {connect} from 'react-redux';
import {getSeats, updateSeat, deleteSeat, hightlightSeat, updateCoordinates, sendCoordToServer} from '../actions/seat.action';
import {updatePerson, getPersons, switchOffSelectionMode} from '../actions/person.action';


class FloorPlan extends Component {

    constructor(props) {
        super(props);

        this.state = {
            event: false,
            titleInput: false,
            personInput: false
        };

    }

    //GET ALL SEATS
    componentWillMount() {
        this.props.getSeats()
    }

    //UPDATE COORDINATES
    handleStop(s, index, ui, current) {

        const seat = {...s, x: current.x, y: current.y};

        this.props.updateCoordinates(seat, index);

        this.props.sendCoordToServer(seat, index);

    }

    //OPEN SEAT POPUP
    openPopUp(seat, index, e) {

        if (this.props.person.selectionMode == false) {

            //SELECTION MODE - OFF
            if (e.target.tagName == 'DIV') {
                e.target.childNodes[1].style.display = 'block';
                this.setState({titleInput: false})

            }

            if (e.target.tagName == 'SPAN') {
                e.target.parentNode.childNodes[1].style.display = 'block';
                this.setState({titleInput: false})

            }
        } else {

            //SELECTION MODE - ON

            const person = this.props.person.personInfo;

            if ((person.seatId == 'free') && (seat.occupantId == 'free')) {

                const newOccupant = `${person.name} ${person.lastName}`;

                const newSeat = {...seat, occupant: newOccupant, occupantId: person._id, status: 'occupied'};

                this.props.updateSeat(newSeat, index).then(r => {

                    this.props.updatePerson(seat._id, person._id);
                })

            }

            if ((person.seatId == 'free') && (seat.occupantId !== 'free')) {

                const newOccupant = `${person.name} ${person.lastName}`;
                const newSeat = {...seat, occupant: newOccupant, occupantId: person._id};

                this.props.updateSeat(newSeat, index).then(r => {

                    this.props.updatePerson('free', seat.occupantId);

                    this.props.updatePerson(seat._id, person._id);

                })

            }

            if ((person.seatId !== 'free') && (seat.occupantId == 'free')) {

                const newOccupant = `${person.name} ${person.lastName}`;
                const newSeat = {...seat, occupant: newOccupant, occupantId: person._id, status: 'occupied'};

                this.props.updateSeat(newSeat, index);

                this.props.updatePerson(seat._id, person._id);

                const oldSeat = {_id: person.seatId, status: 'free', occupant: 'free', occupantId: 'free'};

                const indexPersonSeat = this.props.seat.seats.map(seat => seat._id).indexOf(person.seatId);

                this.props.updateSeat(oldSeat, indexPersonSeat); // change index

            }

            if ((person.seatId !== 'free') && (seat.occupantId !== 'free')) {

                if (confirm(`If you want to place ${seat.occupant} into ${person.name} seat - press OK.
                             If you want to ${seat.occupant} set FREE press - NO.
              `)) {
                    const newOccupant = `${person.name} ${person.lastName}`;
                    const newSeat = {...seat, occupant: newOccupant, occupantId: person._id};

                    this.props.updatePerson(person.seatId, seat.occupantId);

                    this.props.updateSeat(newSeat, index);

                    this.props.updatePerson(seat._id, person._id);

                    const oldSeat = {_id: person.seatId, occupant: seat.occupant, occupantId: seat.occupantId};

                    const indexPersonSeat = this.props.seat.seats.map(seat => seat._id).indexOf(person.seatId);

                    this.props.updateSeat(oldSeat, indexPersonSeat);

                } else {

                    const newOccupant = `${person.name} ${person.lastName}`;
                    const newSeat = {...seat, occupant: newOccupant, occupantId: person._id};

                    this.props.updatePerson('free', seat.occupantId);

                    this.props.updateSeat(newSeat, index);

                    this.props.updatePerson(seat._id, person._id);

                    const oldSeat = {_id: person.seatId, occupant: 'free', occupantId: 'free', status: 'free'}

                    const indexPersonSeat = this.props.seat.seats.map(seat => seat._id).indexOf(person.seatId);

                    this.props.updateSeat(oldSeat, indexPersonSeat);
                }

            }

            //SET SOME STYLE TO SEAT
            this.props.seat.seats.forEach(i => {
                if (i.style == 'hightLight') {
                    i.style = 'off'
                }
            });

            seat.style = "hightLight";
        }

        this.props.hightlightSeat(this.props.seat.seats);
    }

    //CLOSE SEAT POPUP
    closePopUp(e) {
        e.target.parentNode.parentNode.style.display = 'none';
        this.setState({titleInput: false, personInput: false})

    }


    //DELETE SEAT
    deleteSeat(s, index, ui, current) {
            ui.target.parentNode.style.display = 'none';
        if (confirm("Are you sure you want to delete this seat?")) {

            this.props.deleteSeat(s._id, index);

            const seatId = 'free';
            if (s.occupantId !== 'free') this.props.updatePerson(seatId, s.occupantId);


        } else {
            return false;
        }
    }

    //OPEN INPUT TO CHANGE TITLE
    openInputTitle() {
        if (this.props.auth.login == false){
            return false
        }{
            this.setState({titleInput: true});
        }

    }

    //OPEM INPUT TO CHANGE OCCUPANT
    openInputPerson(e) {
        if (this.props.auth.login == false){
            return false
        }else{
            if (e.target.tagName == 'P') {
                this.setState({personInput: true});
                this.props.getPersons();
            }
        }

    }

    //CHANGE TITLE
    changeTitle(seat, index, e) {
        e.preventDefault();

        const newTitle = e.target.parentNode.childNodes[0].elements[0].value;

        const newSeat = {...seat, title: newTitle};

        this.props.updateSeat(newSeat, index)


        this.setState({titleInput: false})
    }

    //CHANGE PERSON IN SEAT
    changePerson(seat, index, e) {
        e.preventDefault();

        var newOcupant = e.target.parentNode.childNodes[4].elements[0].value.split('#divider#')[0];
        var newOcupantId = e.target.parentNode.childNodes[4].elements[0].value.split('#divider#')[1];

        if (seat.occupantId !== 'free') {
            const seatId = 'free';
            this.props.updatePerson(seatId, seat.occupantId).then(r => {

                const newSeat = {...seat, occupant: newOcupant, occupantId: newOcupantId};

                this.props.updateSeat(newSeat, index);
                this.props.updatePerson(seat._id, newOcupantId)
            })
        } else {
            const newSeat = {...seat, occupant: newOcupant, occupantId: newOcupantId, status: 'occupied'};
            this.props.updateSeat(newSeat, index);
            this.props.updatePerson(seat._id, newOcupantId);
        }

        this.setState({personInput: false})
    }


    //DELETE OCCUPANT FROM THE SEAT
    deleteOccupant(seat, index) {

        if (confirm("Are you sure you want to delete occupant from this seat?")) {
            const newSeat = {...seat, occupant: "free", occupantId: "free", status: 'free'};
            this.props.updateSeat(newSeat, index);


            const seatId = 'free';
            if (seat.occupantId !== 'free') this.props.updatePerson(seatId, seat.occupantId);

        }
    }

    //SWITCH OFF SELECTION MODE
    offSelectionMode() {
        this.props.switchOffSelectionMode(false);

        this.props.seat.seats.forEach(i => {
            if (i.style == 'hightLight') {
                i.style = 'off'
            }
        });

        this.props.hightlightSeat(this.props.seat.seats);

    }


    render() {

        const persons = this.props.person.persons.map((person, index) => {
            return (
                <option value={`${person.name} ${person.lastName}#divider#${person._id}`}
                        key={index}>{person.name} {person.lastName}</option>
            )
        });


        const seats = this.props.seat.seats.map((seat, index) => {
            return (

                <Draggable key={index}
                           axis="both"
                           handle=".seat"
                           disabled={this.props.person.selectionMode == false && this.props.auth.login ? false : true}
                           id={seat._id}
                           start={{x: seat.x, y: seat.y}}
                           position={{x: seat.x, y: seat.y}}
                           bounds="parent"
                    // onStart={::this.startDrag}
                           onStop={this.handleStop.bind(this, seat, index)}>

                    <div onClick={this.openPopUp.bind(this, seat, index)}
                         className={seat.style == "hightLight" ? 'hightLight seat' : 'seat'}>

                        <span className="status">{seat.title}</span>
                        <div className="seat_popup">
                            {!this.state.titleInput ?
                                <h6 onClick={::this.openInputTitle}>{`Title: ${seat.title}`}</h6> :
                                <form ref="form" className={!this.state.titleInput ? 'close' : 'change_title'}
                                      onSubmit={this.changeTitle.bind(this, seat, index)}>
                                    <input className="form-control" type="text" defaultValue={seat.title}/>
                                    <input className="btn btn-secondary" type="submit" value="Save"/>
                                </form> }


                            <p>{`Status: ${seat.status}`}</p>
                            <p className={this.state.personInput ? 'close' : 'occupant_name'}
                               onClick={this.openInputPerson.bind(this)}>{`Occupant: ${seat.occupant}`}

                            </p>
                            <span onClick={this.deleteOccupant.bind(this, seat, index)}
                                  className={this.state.personInput || seat.status == 'free' || !this.props.auth.login ? 'close' : 'del_occupant'}>&times;</span>

                            <form className={!this.state.personInput ? 'close' : 'change_person'}
                                  onSubmit={this.changePerson.bind(this, seat, index)}>
                                <select className="form-control">
                                    {persons}
                                </select>
                                <input className="btn btn-secondary" type="submit" value="Save"/>
                            </form>
                            <button className={this.props.auth.login ? 'btn btn-secondary dell_seat' : 'close'}
                                    onClick={this.deleteSeat.bind(this, seat, index)}>Delete seat
                            </button>
                            <span className="close_pop_up_seat" onClick={::this.closePopUp}>
                                <i className="fa fa-window-close" aria-hidden="true"></i>
                            </span>

                        </div>
                    </div>

                </Draggable>
            )
        });

        return (

            <div className="parent">

                {this.props.person.selectionMode ? <div className="selection_title">SELECTION MODE
                    <span className="selection_cross" onClick={::this.offSelectionMode}>&times;</span></div> : "" }
                {this.props.seat.fetchingSeats ? <img src="../../img/spinner.gif"/> : '' }
                {seats}
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
    getSeats,
    updateSeat,
    deleteSeat,
    updatePerson,
    getPersons,
    switchOffSelectionMode,
    hightlightSeat,
    updateCoordinates,
    sendCoordToServer
})(FloorPlan);