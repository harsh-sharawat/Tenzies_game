import {useState} from 'react'
import {nanoid} from 'nanoid'

import Die from "./Die";

let bestplay = undefined;
let rollcount  = 0 ;


export default function Dice(){

    const [arr , setArr] = useState(generateNewDice());
    const [freeze , setFreeze] = useState(0)


    
    const isWon = arr.every(die=> die.isHeld);

    if(isWon){
        if(bestplay === undefined) bestplay = rollcount;

        else bestplay = Math.min(bestplay , rollcount);


    }

    
    function selectDie(id){

        setArr(oldarray =>{
            
            const narr = oldarray.map((obj)=>{
                if(obj.id === id){
                    setFreeze(obj.value)
                    return {
                        ...obj,
                        isHeld : true
                    }
                }

                else return obj;

            })
            
            return narr;
        })
    }
    function generateNewDice(){
        const narr = [];
        for(let i = 1 ; i<=10;  i++){
            let val = Math.ceil(Math.random() *6);
            const obj = {
                id : nanoid(),
                value : val, 
                isHeld : false,
            }
            narr.push(obj);
        }

        return narr;
        
    }

    function roll(){
        rollcount+=1;
        console.log()
        setArr(oldarr => {
            const narr = oldarr.map(obj =>{
                if(obj.isHeld === true) return obj;
                else {
                    const nobj = {
                        ...obj,
                        value : Math.ceil(Math.random()*6)
                    }
                    
                    return nobj;
                }
            })

            return narr;

    
        });

    }

    function reset(){
        rollcount = 0 ;
        setFreeze(0);
        setArr(oldarr=>{
            const narr = generateNewDice();
            return narr;
        });
    }
    

    const dice =  arr.map((obj)=>{
        return(
            <Die value = {obj.value}
             key = {obj.id} 
             id = {obj.id} 
             hold = {selectDie}
             isHeld = {obj.isHeld}
             freezeValue = {freeze}
            
            />
        )
    });



    const styles = {
        color : "gold" 
    }
    return (
        <>

            <div className = "dice">

                {dice}
            </div>

            <div className =  "buttons">

                <button 
                className = "roll-button"
                disabled = {isWon}
                onClick = {roll}
                style = {isWon?styles : {}}
                
                >
                    {isWon?"You Won" :"Roll"}
                </button>


                <button 
                className = "new-game"
                onClick = {reset}
                >New Game</button>
            </div>

            <div className = "score">

                <p>Rollcount : {rollcount}</p>
                <p>Best Play : {bestplay === undefined ? "none" : bestplay}</p>
            </div>
        </>


    )



}