import React, { Component } from 'react';
import Cardlist from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css'
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import {setSearchField, requestRobots} from '../actions';
import {connect} from 'react-redux';

const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
    }
}

class App extends Component {




componentDidMount() {
   this.props.onRequestRobots();
}


    render(){


        const { searchField, onSearchChange, robots, pending} = this.props;
        const filteredRobots = robots.filter(robot =>{
            return robot.name.toLowerCase().includes(searchField.toLowerCase())
        })

        if(this.pending){
            return <h1>Loading</h1>
        } else {
    return(
        
        <div className='tc'>
        <h1 className = 'f1'>RoboFrens</h1>
        <SearchBox searchChange={onSearchChange}/>
        <Scroll>
            <ErrorBoundry>
            <Cardlist robots = {filteredRobots}/>
            </ErrorBoundry>
        </Scroll>
        </div>
    );
        }
}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);