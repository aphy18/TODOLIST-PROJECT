import './styles/home.css'
import { useState, useEffect } from 'react';
import Aos from "aos";

function App() {

  let [counter, setCounter] = useState(0)
  let [newUser, setNewUser] = useState(false);
  let [name, setName] = useState('');
  let [title, setTitle] = useState('');
  let [date, setDate] = useState(null);
  let [error, setError] = useState(false);
  let [errorText, setErrorText] = useState("");

  // onload animation states in order
  let [animate, setAnimate] = useState(false)
  let [welcome, SetWelcome] = useState(true);
  let [header, setHeader] = useState(false);

  // click button state animation
  let [btn, setBtn] = useState(false);

  useEffect(() => {
    let welcomeMsg = document.querySelectorAll(".welcome-message-letter");
    setTimeout(() => {
      for (let letter of welcomeMsg) {
        letter.style.transform = "translateY(35px)";
        letter.style.opacity = 1;
      }
    }, 500)
    setTimeout(() => {
      for (let letter of welcomeMsg) { 
        letter.style.transitionDuration = "1s"
        letter.style.transform = "translateY(-1000px)";
      }
      setAnimate(true)
    }, 3000)
  }, [])
  
  useEffect(() => {
    setTimeout(() => {
      SetWelcome(false);
      }, 4000)
    }, [animate])


  useEffect(() => {
    let header = document.querySelector(".heading");
    let buttonContainer = document.querySelector(".button-container")
    setTimeout(() => {
      header.style.fontSize = "40px";
      buttonContainer.style.transform = "scale(1,1)"
      setHeader(true);
    }, 50)
  }, [welcome])

  useEffect(() => {
    let nameContainers = document.querySelectorAll(".name-container");
    let nameContainersArr = Array.from(nameContainers);
    setTimeout(() => {
      for (let i=0; i < nameContainersArr.length; i++) {
        setTimeout(() => {
          nameContainersArr[i].style.transform = "translateY(-30px)";
          nameContainersArr[i].style.opacity = "1";
        }, i * 325)
      }
    }, 1000)

  }, [header])

  const tooManyWords = { 
    color: "red"
  }
  const withinRange = { 
    color: "black"
  }

  // click "+" button
  function changeBody(event) {
    let mainBody = document.getElementById("body");
    let buttonContainer = document.querySelector(".button-container");
    setNewUser(true);
    mainBody.classList.add("change-body");
    buttonContainer.style.width = "150px";
    // buttonContainer.style.justifyContent = "space-around";
    setBtn(true)
  }

  useEffect(() => {
    let todoForm = document.querySelector(".new-todo-form");
    let plusButton = document.querySelector(".plus-button");
    let minusButton = document.querySelector(".exit-button");
    setTimeout(() => {
      if (btn === true) {
        minusButton.style.opacity = "1";
        minusButton.style.transform = "translateX(10px)";
        plusButton.style.transform = "translateX(-10px)";
        todoForm.style.transform = "translateY(30px)";
        todoForm.style.opacity = "1";
      } else {
        plusButton.style.transform = "translateX(0.1px)";
        minusButton.style.transform = "translateX(-5px)";
      }
    }, 1)
  }, [btn])
  
  // click "-" button
  function revertBody() {
    let mainBody = document.getElementById("body");
    let buttonContainer = document.querySelector(".button-container");
    let plusButton = document.querySelector(".plus-button");
    mainBody.classList.remove("change-body");
    buttonContainer.style.width = "100px";
    setNewUser(false);
    setError(false);
    setName('');
    setTitle('');
    setBtn(false);
  }

  

  // when u submit form
  const generate = (event) => {
    event.preventDefault();
    // checking for length
    if (title.length > 15) {
      setError(true)
      setErrorText("Title can't be more than 15 characters");
      return;
    } else if (name.length > 10) {
      setError(true)
      setErrorText("Name can't be more than 10 characters");
      return;
    } else {
      const nameContainers = document.querySelectorAll('.name-container');
      const nameContainerArr = Array.from(nameContainers);
      const nameDiv = document.createElement("div");
      const topDiv = document.createElement("div");
      const bottomDiv = document.createElement("div");
      const newTitle = document.createElement("p");
      const newName = document.createElement("p");
      const newDate = document.createElement("p");
  
      if (!date) {
        newDate.innerText = "N/A";
      } else {
        newDate.innerText = date;
      }

      newDate.classList.add("date")

      newTitle.innerText = title;
      newTitle.classList.add("title-text");

      newName.innerText = name;
      newName.classList.add("name-text");

      topDiv.classList.add("top-div")
      topDiv.append(newDate);

      bottomDiv.classList.add("bottom-div");
      bottomDiv.append(newTitle, newName);

      nameDiv.classList.add("name-div");
      nameDiv.append(topDiv, bottomDiv);
      let nameDivs = document.querySelectorAll(".name-div");
      let nameDivsArr = Array.from(nameDivs);
      console.log("all name divs --->", nameDivsArr)
      for (let i=0; i < nameDivsArr.length; i++) {
        if (nameDivsArr.indexOf(nameDivsArr[i]) % 2 === 0) {
          nameDivsArr[i].classList.add("div-left-slide")
        } else {
          nameDivsArr[i].classList.add("div-left-slide")
        }
      }
      setCounter(counter += 1);
  
      // which container to append to
      if (counter <= 5) {
        nameContainerArr[0].append(nameDiv);
      } else if (counter > 5 && counter <= 10) {
        nameContainerArr[1].append(nameDiv);
      } else if (counter > 10 && counter <= 15) {
        nameContainerArr[2].append(nameDiv);
      }
      revertBody()
    }
  }

  return (
    <>
    {welcome ? <div className="initial-body">
      <span className="welcome-message-letter">T</span>
      <span className="welcome-message-letter">o</span>
      <span className="welcome-message-letter">d</span>
      <span className="welcome-message-letter">o</span>
      <span className="welcome-message-letter">l</span>
      <span className="welcome-message-letter">i</span>
      <span className="welcome-message-letter">s</span>
      <span className="welcome-message-letter">t</span>
      </div> : 
     <div id="body">
      <div className="heading-container">
        <h1 className="heading" data-aos="fade-in">Select a Todolist</h1>
      </div>
      <div className="button-container">
        <div className="button-sub-container">
          <button className="plus-button" onClick={(e) => changeBody(e)}>+</button>
          {newUser ? <button className="exit-button" onClick={() => revertBody()}>-</button> : null}
        </div>
      </div>
     <main className="main-container">
   {newUser ?
     <form className="new-todo-form" onSubmit={(e) => generate(e)}>
       <div className="todo-section-form">
         <label>Todolist Title:</label>
         <input className="title-input" type='text' placeholder='title' onChange={(e) => setTitle(e.target.value)} required />
         <span className="title-counter" style={title.length > 15 ? tooManyWords : withinRange}>{title.length}/15</span>
       </div>
       <div className="date-section-form">
         <label>Date:</label>
         <input className="date-input" type='date' onChange={(e) => setDate(e.target.value)} />
       </div>
       <div className="name-section-form">
         <label>Name:</label>
         <input className="name-input" type='text' placeholder='name' onChange={(e) => setName(e.target.value)} required />
         <span class="name-counter" style={name.length > 10 ? tooManyWords : withinRange}>{name.length}/10</span>
       </div>
       {error ? <p className="error">{errorText}</p> : null}
       <button className="submit-form">New Todo</button>
     </form>
   : null}
     <div className="name-container"></div>
     <div className="name-container"></div>
     <div className="name-container"></div>
     <div className="name-container"></div>
 </main>
 </div>}
   </>
  );
}

export default App;