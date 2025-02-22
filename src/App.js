import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

function App() {
  const [value, setValue] = useState(Array(9).fill(0));
  const [square, setSquare] = useState([]);
  const [win, setWin] = useState(null);
  const width = window.innerWidth;
  const height = window.innerHeight;
  const [combinationIdx, setCombinatioIdx] = useState(null);
  const [style, setStyle] = useState({
    top: 0,
    rotate: 0,
    height: 0,
    left: 0,
  });

  const combination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const Restart = () => {
    setWin(null);
    setSquare([]);
    setValue(new Array(9).fill(0));
  };

  useEffect(() => {
    combination.forEach((item, index) => {
      if (
        value[item[0]] == value[item[1]] &&
        value[item[1]] == value[item[2]] &&
        value[item[0]] != 0
      ) {
        setWin(() => value[item[0]]);
        setCombinatioIdx(() => index);
      }
    });
    if (value[0] == value[1] && value[1] == value[2] && value[1] != 0) {
      setStyle(() => ({
        height: 16,
        top: -3.7,
        rotate: 90,
      }));
    }
    if (value[3] == value[4] && value[4] == value[5] && value[3] != 0) {
      setStyle(() => ({
        height: 16,
        top: 3,
        rotate: 90,
      }));
    }
    if (value[6] == value[7] && value[7] == value[8] && value[6] != 0) {
      setStyle(() => ({
        height: 16,
        top: 9.5,
        rotate: 90,
      }));
    }
    if (value[0] == value[3] && value[3] == value[6] && value[0] != 0) {
      setStyle(() => ({
        height: 16,
        top: 3,
        left: 3,
      }));
    }
    if (value[1] == value[4] && value[4] == value[7] && value[1] != 0) {
      setStyle(() => ({
        height: 16,
        top: 3,
        left: 9.6,
      }));
    }
    if (value[2] == value[5] && value[5] == value[8] && value[2] != 0) {
      setStyle(() => ({
        height: 16,
        top: 3,
        left: 16.2,
      }));
    }
    if (value[0] == value[4] && value[4] == value[8] && value[0] != 0) {
      setStyle(() => ({
        height: 22,
        left: 9.9,
        rotate: 135,
        top: 0,
      }));
    }
    if (value[2] == value[4] && value[4] == value[6] && value[2] != 0) {
      setStyle(() => ({
        height: 22,
        top: -0.5,
        left: 9.9,
        rotate: 225,
      }));
    }
    if (value.every((x) => x != 0) && win == null) {
      Restart();
    }
  }, [value]);

  const handleClick = (value, index) => {
    setSquare((prev) => {
      const newValue = [...prev];
      if (square[square.length - 1] == "X") newValue.push("O");
      else newValue.push("X");
      return newValue;
    });
    setValue((x) => {
      const newValue = [...x];
      newValue[index] = square[square.length - 1] || "O";
      return newValue;
    });
  };

  return (
    <div className="App">
      {win != null ? (
        <>
          <h1>
            <span style={{ color: "rgb(19, 51, 77)", fontSize: "2.3rem" }}>{win}</span>&nbsp; wins
            the game
          </h1>
          <button className="glow-on-hover" onClick={() => Restart()}>
            Restart Game
          </button>
        </>
      ) : (
        <>
          <h1>Game Started</h1>
          <button className="glow-on-hover" onClick={() => Restart()}>
            Reset Game
          </button>
        </>
      )}
      <div className="square">
        {win != null && (
          <div
            style={{
              rotate: `${style.rotate}deg`,
              height: `${style.height}rem`,
              top: `${style.top}rem`,
              left: `${style.left}rem`,
            }}
            className="line"
          ></div>
        )}
        {value.map((item, index) => {
          return (
            <button
              className={item == "X" ? "square-btn-x" : "square-btn-o"}
              disabled={win || item != 0}
              onClick={() => handleClick(item, index)}
              key={index}
            >
              {item !== 0 && value[index]}
            </button>
          );
        })}
      </div>
      {win != null && <Confetti width={width} height={height} />}
    </div>
  );
}

export default App;
