const React = require('react')

class Index extends React.Component{
    render(){
        //destructuring 
        const {fruits} = this.props
        return(
            <div>
                 <link rel="stylesheet" href="/css/app.css"/>  
                <h1>Fruit Index Page</h1>
                <ul>
                    {fruits.map((fruit, i) => {
                        return(
                            <li key = {i}>
                                The <a href = {`/fruits/${fruit.id}`}> {fruit.name}</a>
                                {' '} is {fruit.color}. {fruit.readyToEat ? 'It is ready to eat' : 'It is not ready to eat'}
                                <br/>
                                <a href={`/fruits/${fruit._id}/edit`}>Edit This Fruit</a>
                                <form action = {`/fruits/${fruit._id}?_method=DELETE`} method="POST">
                                    <input type = "submit" value = "DELETE"/> 
                                </form>
                            </li>
                        )
                    })}
                </ul>
                <nav>
                    <a href='/fruits/new'>Create a New Fruit</a>
                </nav>
            </div>
        )
    }
}

module.exports= Index