import './style.css';
import {useState} from 'react';

function FraudRN() {

  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const FraudWord= [
  {
    Word:"Bodo"
  },
  {
    Word: "Stupid"
  },
  {
    Word:"Bodoooooo"
  },
  {
    Word: "wtf"
  }
];
  
  //filtering keywords
  const handleChange = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = FraudWord.filter((value) => {
      return value.Word.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord !== "") {
      let regExp = new RegExp(FraudWord, "gi");
         searchWord.innerHTML = (searchWord.textContent).replace(regExp, "<mark>$&</mark>");
    }
  };


  return (
    <div className="word">
      <div className = "TestingText">
        <textarea id = "EnterText"  value = {wordEntered} onChange = {handleChange}></textarea>
        <img src={process.env.PUBLIC_URL + "/images/filter.png"} className="filter"/>
      <label>Filtered Word:</label>
      <label id = "PresentWord">Present</label>
      <label id = "NotPresent">None</label>
      </div>
    </div>
    
  );
}

export default FraudRN;
