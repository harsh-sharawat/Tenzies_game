export default function Die(props){

    // console.log("re-render" , props.id);

    return(

        <button 
        id = {props.id} 
        className = "die"
        style = {{backgroundColor : (props.isHeld?"cyan":"white")}} 
        onClick = {()=>{props.hold(props.id)}}

        disabled = {!(props.freezeValue === 0 || props.value === props.freezeValue) }

        >
            {props.value}
        </button>
    )

}