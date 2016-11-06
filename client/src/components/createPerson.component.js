import React, {Component} from 'react';
import {connect} from 'react-redux';
import {openPopUpPerson} from '../actions/person.action';
import {cteateNewPerson} from '../actions/person.action';


class CreateNewPersonComponent extends Component {

    constructor(props) {
        super(props);
    }

    //CLOSE POPUP
    onClose(e) {
        e.preventDefault();
        this.props.openPopUpPerson(false)
    }

    //CREATE NEW PERSON
    createNewPerson(e) {
        e.preventDefault();

        let name = this.refs.name.value;
        let lastName = this.refs.lastName.value;
        let email = this.refs.email.value;


        const person = {
            name,
            lastName,
            email,
            seatId: "free"

        };

        this.props.cteateNewPerson(person);

        this.refs.name.value = '';
        this.refs.lastName.value = '';
        this.refs.email.value = '';

    }


    render() {

        return (
            <div className={this.props.auth.login ? '' : 'close'}>
                <div>
                    <button className="btn btn-secondary" onClick={this.props.openPopUpPerson.bind(this, true)}>Create
                        new person
                    </button>
                    <form onSubmit={::this.createNewPerson}
                          className={!this.props.person.CreatePersonPopUp ? 'close' : 'create_person_pop_up'}>
                        <div>
                            <input className="form-control" type="text" ref="name" id="name" required
                                   placeholder="name"/>
                        </div>

                        <div>
                            <input className="form-control" type="text" ref="lastName" id="lastName" required
                                   placeholder="lastName"/>
                        </div>

                        <div>
                            <input className="form-control" type="email" ref="email" id="email" required
                                   placeholder="email"/>
                        </div>

                        <button className="create_add btn btn-info" type="submit">Add</button>
                        <span className="closePopUp" onClick={::this.onClose}>
                           <i className="fa fa-window-close" aria-hidden="true"></i>
                        </span>
                    </form>
                </div>
            </div>

        )
    }
}


function mapStateToProps(state) {
    return {
        person: state.person,
        auth: state.login
    };
}

export default connect(mapStateToProps, {openPopUpPerson, cteateNewPerson})(CreateNewPersonComponent);
 




 
