import React, {Component} from 'react';
import {connect} from 'react-redux';
import {login, logout, openLoginPopUp} from '../actions/login.action';
import { switchOffSelectionMode } from '../actions/person.action';

class Login extends Component {

    constructor(props) {
        super(props);
    }


    //LOGIN
    login(e) {
        e.preventDefault();

        const username = this.refs.login.value;
        const password = this.refs.password.value;

        this.props.login({username, password});

        this.refs.login.value = '';
        this.refs.password.value = '';

    }

    //LOGOUT
    logout() {
        this.props.logout();
        this.props.switchOffSelectionMode(false);
    }

    //CLOSE LOGIN POPUP
    closeLoginPopUp() {
        this.props.openLoginPopUp(false);
    }


    render() {

        return (

            <div className="login_box">
                <button className={this.props.auth.login ? 'close' : 'btn btn-secondary'}
                        onClick={this.props.openLoginPopUp.bind(this, true)}>Login
                </button>
                <button className={!this.props.auth.login ? 'close' : 'btn btn-secondary'} onClick={::this.logout}>
                    Logout
                </button>
                <form className={this.props.auth.loginPopUp ? '' : 'close'} onSubmit={::this.login}>
                    <div><input className="form-control" type="text" ref="login" placeholder="login" required/></div>
                    <div><input className="form-control" type="password" ref="password" placeholder="password"
                                required/></div>
                    <div className={this.props.auth.error ? '' : 'close'}>
                        <small>Incorrect login/password</small>
                    </div>
                    <div><input className="btn btn-secondary" type="submit" value="Submit"
                                disabled={this.props.auth.fetchingAccess ? true : false}/></div>
                    <span className="close_pop_up_login" onClick={::this.closeLoginPopUp}>
                        <i className="fa fa-window-close" aria-hidden="true"></i>
                    </span>
                </form>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        auth: state.login

    }
}

export default connect(mapStateToProps, {login, logout, openLoginPopUp, switchOffSelectionMode})(Login);
 
