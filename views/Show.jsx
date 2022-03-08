const React = require('react')

class Show extends React.Component{
    render(){
        //what we are passing to show/render on the page 
        const fruit = this.props.fruit
        return(
            <div>
            <h1>Show Page</h1>
           The {this.props.fruit.name} is {this.props.fruit.color}
            </div>
        )
    }
}

module.exports = Show