import React, {Component} from 'react';
import CreateNewSeatComponent from './createSeat.component';
import CreateNewPersonComponent from './createPerson.component';
import SearchComponent from './search.component';
import LoginComponent from './login.component';


export default class NavComponent extends Component {


    render() {

        return (

            <header>
                <CreateNewSeatComponent/>
                <SearchComponent/>
                <CreateNewPersonComponent/>
                <LoginComponent/>
            </header>
        )
    }
}
 
