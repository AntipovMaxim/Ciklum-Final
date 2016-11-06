import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {
    searchPersons,
    getFreePersons,
    getPersonInfo,
    switchOffSelectionMode,
    setSearchBoxFree
} from '../actions/person.action';
import {hightlightSeat} from '../actions/seat.action';

class SearchComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            personInfo: false,
            seat: [{title: null}]
        }
    }

    //SEARCH PERSONS
    searchPersons() {

        const input = ReactDOM.findDOMNode(this.refs.search);

        this.props.searchPersons(input.value);

    }


    //GET FREE PERSONS
    getFreePersons() {
        const checkValue = ReactDOM.findDOMNode(this.refs.free).checked;

        if (checkValue) {
            this.props.getFreePersons(this.props.person.searchedPersons, checkValue.checked)
            console.log(checkValue.checked)
        } else {
            this.searchPersons();
        }

    }

    //OPEN PERSON INFO POPUP
    openPersonPopUp(person, e) {

        this.props.getPersonInfo(person);

        const seat = this.props.seat.seats.filter(item => {
            return person.seatId == item._id;
        });

        //SET SOME STYLE TO SELECTED SEAT
        this.props.seat.seats.forEach(i => {
            if (i.style == 'hightLight') {
                i.style = 'off'
            }
        });


        if (seat.length !== 0) {
            seat[0].style = "hightLight";
        }

        this.setState({seat});

        this.setState({personInfo: true});


        const input = ReactDOM.findDOMNode(this.refs.search);

        input.value = "";

        this.props.setSearchBoxFree();

    }

    //CLOSE PERSON INFO POP UP
    closePopUpPerson() {

        this.props.seat.seats.forEach(i => {
            if (i.style == 'hightLight') {
                i.style = 'off'
            }
        });

        this.props.hightlightSeat(this.props.seat.seats);
        this.setState({personInfo: false})

    }

    //SWITCH ON SELECTION MODE
    setSelectionMode(person) {
        this.props.switchOffSelectionMode(true)

    }

    render() {

        const filterPersons = this.props.person.searchedPersons.map((person, index) => {
            return (

                <li onClick={this.openPersonPopUp.bind(this, person)}
                    key={index}>{person.name} {person.lastName} &#8594; {person.seatId == 'free' ? 'free' : 'occupant'}</li>

            )
        });

        const personInfo = this.props.person.personInfo;

        const seat = this.props.seat.seats.filter(item => {
            return personInfo.seatId == item._id;
        });


        return (
            <div className="search_info">
                <form className="form-inline">
                    <input className="form-control" onChange={::this.searchPersons} type="text" ref="search"
                           placeholder="Search persons"/>
                    <label >
                        <input ref="free" className="form-control" type="checkbox" onChange={::this.getFreePersons}/>
                        Free
                    </label>
                </form>

                <div className="search_box">
                    <ul>{filterPersons}</ul>
                </div>
                {personInfo.name == undefined ? "" : <div className={this.state.personInfo ? 'person_info' : 'close'}>
                    <h6>Name: {personInfo.name}</h6>
                    <h6>Last Name: {personInfo.lastName}</h6>
                    <p>Email: {personInfo.email}</p>
                    <div
                        className="assign_box">{personInfo.seatId == `free` ? `Status: free` : `Seat Title: ${seat[0].title}`}
                        <button onClick={this.setSelectionMode.bind(this, personInfo)}
                                className={this.props.auth.login ? 'assign_button btn btn-secondary' : 'close'}>Assign
                        </button>
                    </div>
                    <span className="close_pop_up_seat" onClick={::this.closePopUpPerson}>
                        <i className="fa fa-window-close" aria-hidden="true"></i>
                    </span>
                </div> }
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        seat: state.seat,
        person: state.person,
        auth: state.login
    }
}

export default connect(mapStateToProps, {
    searchPersons,
    getFreePersons,
    getPersonInfo,
    switchOffSelectionMode,
    hightlightSeat,
    setSearchBoxFree
})(SearchComponent);

