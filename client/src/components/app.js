import React, {Component} from 'react';
import FloorPlan from './floorplan.component';
import Nav from './nav.component'


export default class App extends Component {


    render() {

        return (
            <div>
                <Nav />
                <FloorPlan />
            </div>
        )
    }
}
 
