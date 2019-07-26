import React from 'react';
import axios from 'axios';
import '../css/bootstrap.min.css';
import '../index.css';
export default class Planetas extends React.Component{

    constructor(props){
        super(props);
            this.state = {
            url:'https://swapi.co/api/planets/',
            planets:[],
            films:[],
            getIdPlanet:0
        }
     }
    //Mostrar dados de um planeta aleatório
    ListPlanetsRandom = () =>{
        let arrayFilms = []; 
     var min = Math.ceil(1);
     var max = Math.floor(61);
    var num = Math.floor(Math.random() * (max - min) + min);
     this.setState({getIdPlanet:num});
     axios.get(this.state.url+num)
     .then(res =>{
        this.setState({planets:Array.of(res.data)});
        
        if(res.data.films.length != 0){
            
            for(let i =0; i< res.data.films.length;i++){
             axios.get(res.data.films[i])
             .then(re=>{
                 arrayFilms.push(re.data)
                this.setState({films:arrayFilms});
               console.log(this.state.films)
             }).catch(err=>{
                console.log(err);
             })

            }
        }else{
        arrayFilms = [];
        this.setState({films:[]});
        }
        
     }).catch(error=>{
         console.log(error);
     })
    }
    componentDidMount = () => {
        this.ListPlanetsRandom();
    }
    render(){
        return(
            <div className="containerBody">
                 <h1 align="center">Planets</h1>
                    
                   {/* Inicio do card */}
                   {
                   this.state.planets.map(res =>{
                    return(
                    <div className="card" key={this.state.getIdPlanet}>
                    <h5 className="card-header bg-success mb-3" style={{color:'white'}}>{res.name}</h5>
                    <div className="card-body">
                    <h5 className="card-title">Population:&nbsp;{res.population}</h5>
                    <p className="card-text"><b>Climate:</b>&nbsp;{res.climate}</p>
                    <p className="card-text"><b>Terrain:</b>&nbsp;{res.terrain}</p>
                    <h5 className="card-header">
                    Films:
                    </h5>
                    <br/>
                    {
                        this.state.films.map(resp=>{
                            return(
                                <p className="card-text">{resp.title}</p>  
                            )
                        })
                    }
                    
                    <button onClick={()=>this.ListPlanetsRandom()} className="btn btn-primary">Next</button>
                    </div>
                   
                    </div>
                     );
                    })
                    
                    }
                      {/* Fim do card */}
                   
                </div>
            
        );
    }
}