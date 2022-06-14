import React, { useState, useEffect } from "react";
import data from "./words.json";

let gameItems = [];

function App() {
  const [pullDataStatus, setPullDataStatus] = useState(0);
  const [result, setResult] = useState("");
  const [pastWord, setPastWord] = useState("");
  const [pastMatch, setPastMatch] = useState([""]);
  const [disabled0, setDisabled0] = useState([true]);
  const [disabled1, setDisabled1] = useState([true]);
  const [disabled2, setDisabled2] = useState([true]);
  const [disabled3, setDisabled3] = useState([true]);
  const [disabled4, setDisabled4] = useState([true]);
  const [disabled5, setDisabled5] = useState([true]);
  const [cards, setCards] = useState(0);
  //console.log(gameItems);
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
  //console.log(gameItems);
  const handleClick = (number, word, match) => {
    console.log(number, word, match, cards);
    if (number == 0) {
      setDisabled0(!disabled0);
    } else if (number == 1) {
      setDisabled1(!disabled1);
    } else if (number == 2) {
      setDisabled2(!disabled2);
    } else if (number == 3) {
      setDisabled3(!disabled3);
    } else if (number == 4) {
      setDisabled4(!disabled4);
    } else if (number == 5) {
      setDisabled5(!disabled5);
    }
    if (match == "x" && pastMatch == match) {
      setResult(word, "-", pastWord, "  - match!!");
    } else {
      if (cards == 0) {
        setCards(1);
        setPastMatch(match);
        setPastWord(word);
      } else {
        setCards(0);

        setTimeout(function () {
          setDisabled0(true);
          setDisabled1(true);
          setDisabled2(true);
          setDisabled3(true);
          setDisabled4(true);
          setDisabled5(true);
        }, 2000);
      }
    }
  };

  function addNotification() {} // add notification
  return (
    <div className="App">
      <button
        onClick={() => handleClick(0, gameItems[0].word, gameItems[0].match)}
      >
        {disabled0 ? "🔐" : gameItems[0].word}

        {/* {gameItems[0].word} */}
      </button>
      <button
        onClick={() => handleClick(1, gameItems[1].word, gameItems[1].match)}
      >
        {disabled1 ? "🔐" : gameItems[1].word}
      </button>{" "}
      <button
        onClick={() => handleClick(2, gameItems[2].word, gameItems[2].match)}
      >
        {disabled2 ? "🔐" : gameItems[2].word}
      </button>{" "}
      <button
        onClick={() => handleClick(3, gameItems[3].word, gameItems[3].match)}
      >
        {disabled3 ? "🔐" : gameItems[3].word}
      </button>{" "}
      <button
        onClick={() => handleClick(4, gameItems[4].word, gameItems[4].match)}
      >
        {disabled4 ? "🔐" : gameItems[4].word}
      </button>{" "}
      <button
        onClick={() => handleClick(5, gameItems[5].word, gameItems[5].match)}
      >
        {disabled5 ? "🔐" : gameItems[5].word}
      </button>
      <span>{result}</span>
    </div>
  );
}

export default App;
