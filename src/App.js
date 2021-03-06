import React, { useState, useEffect } from "react";
import data from "./words.json";

let gameItems = [];

function App() {
  const [mainDivDisplay, setMainDivDisplay] = useState("none");
  const [pullDataStatus, setPullDataStatus] = useState(0);
  const [result, setResult] = useState("");
  const [pastWord, setPastWord] = useState("");
  const [pastMatch, setPastMatch] = useState("");
  const [cardDisabled, setCardDisabled] = useState(false);
  const [CardDisplay0, setCardDisplay0] = useState([true]);
  const [CardDisplay1, setCardDisplay1] = useState([true]);
  const [CardDisplay2, setCardDisplay2] = useState([true]);
  const [CardDisplay3, setCardDisplay3] = useState([true]);
  const [CardDisplay4, setCardDisplay4] = useState([true]);
  const [CardDisplay5, setCardDisplay5] = useState([true]);
  const [cards, setCards] = useState(0);
  const [gameButtonText, setGameButtonText] = useState("Start Game");
  let category = "",
    randomCatagories = [
      "color",
      "fruit",
      "country",
      "body",
      "places",
      "animal",
      "clothes",
      "veggies",
      "food",
      "drink",
      "job",
      "bathroom",
      "kitchen",
      "living room",
      "transportation",
      "family",
      "classroom",
      "numbers",
    ];

  function startGame() {
    setPullDataStatus(0);
    setCardDisplayFunc(true);
    setCardDisabled(false);
    setMainDivDisplay("block");
    setResult("");
    setPastWord("");
    setPastMatch("");
    setCards(0);
    setGameButtonText("Reset Game");
  }

  const randomCatSelection = Math.trunc(Math.random() * 17);

  const pulldata = () => {
    const randomSelection = Math.trunc(Math.random() * 5);

    const randomTranslationSelection = Math.trunc(Math.random() * 2);

    let i = 0;
    let ii = 0;
    gameItems = [];

    category = randomCatagories[randomCatSelection];
    while (i < 5) {
      if (category == data[ii].cat) {
        if (i == randomSelection) {
          gameItems.push({
            word: data[ii].english,
            match: "x",
            key: ii.toString(),
          });
          gameItems.push({
            word: data[ii].french,
            match: "x",
            key: ii.toString(),
          });
        } else {
          if (randomTranslationSelection) {
            // multiple english / 1 french

            gameItems.push({
              word: data[ii].english,
              match: "",
              key: ii.toString(),
            });
          } else {
            // multiple french/ 1 english

            gameItems.push({
              word: data[ii].french,
              match: "",
              key: ii.toString(),
            });
          }
        }

        i++;
      }
      ii++;
    }
  };

  if (pullDataStatus == 0) {
    setPullDataStatus(1);
    pulldata();
  }
  const handleClick = (number, word, match) => {
    //console.log(mainDivDisplay);
    // console.log(
    //   "card#:",
    //   number,
    //   "/ currentWord:",
    //   word,
    //   "/ pastWord:",
    //   pastWord,
    //   "/ current match:",
    //   match,
    //   "/ pastmatch",
    //   pastMatch,
    //   "#ofCards",
    //   cards
    // );

    //turn over card that was clicked
    if (number == 0) {
      setCardDisplay0(!CardDisplay0);
    } else if (number == 1) {
      setCardDisplay1(!CardDisplay1);
    } else if (number == 2) {
      setCardDisplay2(!CardDisplay2);
    } else if (number == 3) {
      setCardDisplay3(!CardDisplay3);
    } else if (number == 4) {
      setCardDisplay4(!CardDisplay4);
    } else if (number == 5) {
      setCardDisplay5(!CardDisplay5);
    }
    //**********************************************
    // check it match is the same as the past match
    if (match == "x" && pastMatch == match) {
      // we have a match!!!
      setCardDisabled(true);
      setResult(word + "-" + pastWord + "  - match!! ????");
    } else {
      // NO match!!
      if (cards == 0) {
        // after 1st card selected
        setResult("????");
        setCards(1);
        setPastMatch(match);
        setPastWord(word);
      } else {
        // after 2nd card selected
        setResult("NO match!! ????");
        setCardDisabled(true);
        setCards(0);
        setPastWord("");
        setPastMatch("");
        setTimeout(function () {
          setCardDisplayFunc(true);
          setCardDisabled(false);
          setResult("Try again! ???? ");
        }, 2000);
      }
    }
  };

  function setCardDisplayFunc(value) {
    setCardDisplay0(value);
    setCardDisplay1(value);
    setCardDisplay2(value);
    setCardDisplay3(value);
    setCardDisplay4(value);
    setCardDisplay5(value);
  }

  return (
    <div>
      <div>
        <button onClick={() => startGame()}>{gameButtonText}</button>
      </div>
      <div style={{ display: mainDivDisplay }}>
        <button
          disabled={cardDisabled}
          onClick={() => handleClick(0, gameItems[0].word, gameItems[0].match)}
        >
          {CardDisplay0 ? "????" : gameItems[0].word}

          {/* {gameItems[0].word} */}
        </button>
        <button
          disabled={cardDisabled}
          onClick={() => handleClick(1, gameItems[1].word, gameItems[1].match)}
        >
          {CardDisplay1 ? "????" : gameItems[1].word}
        </button>{" "}
        <button
          disabled={cardDisabled}
          onClick={() => handleClick(2, gameItems[2].word, gameItems[2].match)}
        >
          {CardDisplay2 ? "????" : gameItems[2].word}
        </button>{" "}
        <button
          disabled={cardDisabled}
          onClick={() => handleClick(3, gameItems[3].word, gameItems[3].match)}
        >
          {CardDisplay3 ? "????" : gameItems[3].word}
        </button>{" "}
        <button
          disabled={cardDisabled}
          onClick={() => handleClick(4, gameItems[4].word, gameItems[4].match)}
        >
          {CardDisplay4 ? "????" : gameItems[4].word}
        </button>{" "}
        <button
          disabled={cardDisabled}
          onClick={() => handleClick(5, gameItems[5].word, gameItems[5].match)}
        >
          {CardDisplay5 ? "????" : gameItems[5].word}
        </button>
        <span>{result}</span>
      </div>
    </div>
  );
}

export default App;
