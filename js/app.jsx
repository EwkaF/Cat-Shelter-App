import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            filterText: "",
            likesKids: false
        };
    }

    handleNameChange = (event) => {
  this.setState({filterText: event.target.value});
};


handleCheckChange =(event) => {
    this.setState({likesKids: !this.state.likesKids});
};

    render(){
        console.log(this.state.likesKids)
         return (
         <div id="catShelter">
         <h1>CAT SHELTER APP </h1>
         <h2>Find a cat...</h2>
            <SearchBar 
            filterText={this.state.filterText} 
            likesKids={this.state.likesKids}  
            handleNameChange={this.handleNameChange}
            handleCheckChange={this.handleCheckChange} />
            <CatTable 
            kitties={this.props.kitties} 
            filterText={this.state.filterText} 
            likesKids={this.state.likesKids} 
             />
         </div>
         ); 
    }
}


class SearchBar extends React.Component{
    render(){
        return <form><input type="text" placeholder="Search..." value={this.props.filterText} onChange={this.props.handleNameChange} />
        <p><input type="checkbox" value={this.props.likesKids} onClick={this.props.handleCheckChange} /> Only show kitties that likes kids</p></form>
    }
}
class CatTable extends React.Component {

    render() {
                
// 
        var rows = []; //tworzymy pustą tablicę
        var lastCategory = null; //zmienna przechowująca ostatnią kategorię (płeć)
        this.props.kitties.forEach((kitty)=> {
            //dla każdego obiekty z props.kitties
            
            if(this.props.likesKids && !kitty.likesKids) {
                return false
                }
            else if (this.props.filterText.length > 0 && !kitty.name.toLowerCase().includes(this.props.filterText.toLowerCase())){
                return false
                }

            else if (kitty.category !== lastCategory) { //jeśli pojawia się nowa kategoria (płeć kociaka)
                //dodaj do tablicy rows komponent CatCategoryRow
                     
                rows.push(<CatCategoryRow category={kitty.category} key={kitty.category}/>);
                 
            }
            //dodaj do tablicy rows komponent CatRow
            
                rows.push(<CatRow kitty={kitty} key={kitty.name}/>);
                lastCategory = kitty.category;


                
                

            
            // }
        });
        return <table><thead><tr><th>Name</th><th>Age</th></tr></thead><tbody>{rows}</tbody></table>;
    }
}

class CatCategoryRow extends React.Component {
    render() {
        return <tr><th id="category" colSpan="2">{this.props.category}</th></tr>;
    }
}

class CatRow extends React.Component {
    render() {
        var name = this.props.kitty.likesKids ?
            this.props.kitty.name : <span style={{color: 'red'}}> {this.props.kitty.name} </span>;
        return <tr><td>{name}</td><td>{this.props.kitty.age}</td></tr>;
    }
}

var kitties = [
    {category: "male", age: "4", likesKids: true, name: "Fidel Catstro"},
    {category: "male", age: "9", likesKids: true, name: "Hairy Potter"},
    {category: "male", age: "2", likesKids: false, name: "Grumpy"},
    {category: "female", age: "1", likesKids: true, name: "Jude Paw"},
    {category: "female", age: "2", likesKids: false, name: "Lucifurr"},
    {category: "female", age: "3", likesKids: true, name: "Meowly Cyrus"}
];

ReactDOM.render(
<App kitties = {kitties} />,
document.getElementById('app')
);