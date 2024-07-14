import react, {useState} from 'react'
import axios from 'axios';
import TT_GEN from './tt_generator';
import './App.css';

function App() {
  const [Eq, setEq] = useState("");
  const [truthTable, setTruthTable] = useState([]);
  const [error, setError] = useState("");
 
  const handleEnterPress = (event) => {
    if (event.key == "Enter"){
      setEq(event.target.value);
      handleEqSubmit(event.target.value);
    }
   
  }

  const handleEqSubmit = async (equation) =>{
    // e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/eqdata', { equation });
      console.log(response.data);
      setTruthTable(response.data);
      setError("");
      
    } catch (error) {
      setError("Error with TT Access")
      console.error("There was an error!", error);
    }
  }

  return(
    <>
    <div  style={{marginTop: "10px"}}> Logic Solver... </div>
    <div className='div-rowflex'>
    <p style={{fontSize: "small"}}>Output</p>
    <input onChange={(e) => setEq(e.target.value)} id = "inputField" type='text' onKeyDown={handleEnterPress} placeholder='Enter Equation'/>
    <button onClick={()=> handleEqSubmit(Eq)}>Analyze</button>
    </div>
    <TT_GEN TT_data = {truthTable}></TT_GEN>
    </>
  )
}

export default App;
