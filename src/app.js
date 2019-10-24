import chalk from 'chalk';
import { GraphQLServer } from 'graphql-yoga';
import request from 'request';
import {fetchData} from './fetchData';

const url = 'https://swapi.co/api/people/';
//const urlFilms = `${baseURL}/films`;
/*const urlPlanets = `${baseURL}/planets`;
const urlSpecies = `${baseURL}/species`;
const urlStarships = `${baseURL}/starships`;
const urlVehicles = `${baseURL}/vehicles`;*/


const runApp = (data) => {
    const typeDefs = `
  
    type Query{
        people(page:Int,number:Int,name:String,gender:String): [Character!]!
        character(id:Int):Character!
    }
    type Character{
        name: String!
        gender: String!
        url: String!
        
    }
    `
    //habría metido films: [Films!] dentor de Character
    /*type Films{
      title: String!
      episode_id: Int!
    }*/
    const resolvers ={
      Query:{
        people:(parent,args,ctx,info)=>{
          const page = args.page || 1;
          const number = args.number || 10;
          const inicio = (page - 1) * number;
          const fin = (inicio + number);
          return data
          .filter(c=>c.name ===(args.name||c.name))
          .filter(c => c.gender===(args.gender||c.gender))
          .slice(inicio,fin)
          .map(element=>{
            return{
              name: element.name,
              gender: element.gender,
              url: element.url,
            }

          })
        },
        character:(parent,args,ctx,info)=>{
          /*
          let films =[];
          let url1 = "https://swapi.co/api/films/1/";
          let url2 = "https://swapi.co/api/films/2/";
          let url3 = "https://swapi.co/api/films/3/";
          let url4 = "https://swapi.co/api/films/4/";
          let url5 = "https://swapi.co/api/films/5/";
          let url6 = "https://swapi.co/api/films/6/";
          let url7 = "https://swapi.co/api/films/7/";
          let title1 = "A New Hope"
          let episode1 = 4;
          let title2 = "The Empire Strikes Back";
          let episode2 = 5;
          let title3 = "Return of the Jedi";
          let episode3 = 6;
          let title4 = "The Phantom Menace";
          let episode4 = 1;
          let title5= "Attack of the Clones";
          let episode5 = 2;
          let title6 = "Revenge of the Sith";
          let episode6 = 3;
          let title7 = "The Force Awakens";
          let episode7 = 7;*/
          let urlNueva = `${url}${args.id}/`;
          const obj = data.find(c => c.url === urlNueva);
          
          return{
            name: obj.name,
            gender: obj.gender,
            url: obj.url
            
          }
        }
      },
    }
    const server = new GraphQLServer({typeDefs,resolvers});
    server.start({port:"3000"});//Para elegir el puerto seria ({port:3000})*/
  };
  fetchData(runApp,url);

