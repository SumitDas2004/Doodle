import React, { useEffect, memo, useMemo } from "react";
import CanvasDraw from "react-canvas-draw";
import { useState, useRef } from "react";
import { Slider } from "rsuite";
import "rsuite/Slider/styles/index.css";
import "rsuite/RangeSlider/styles/index.css";
import { client, over } from "stompjs";
import { useDispatch, useSelector } from "react-redux";
import { generateSlug } from "random-word-slugs";
import { toast } from "react-toastify";
import { setWord, endGame, setOwner, removePlayer, addPlayer, startGame as start } from "../reduxStore/roomInfo";
import ScorePage from "./score/ScorePage";
import FinalScorePage from './score/FinalScorePage'
import {showFinalScorePage, changeDetails} from '../reduxStore/scorePage'
import SockJS from "sockjs-client";

const Canvas = () => {
  const dispatcher = useDispatch()
  const playerId = useSelector((state) => state.roomInfo.playerId);
  const roomId = useSelector((state) => state.roomInfo.roomId);
  const owner = useSelector((state) => state.roomInfo.owner);
  const turn = useSelector((state) => state.roomInfo.turn);
  const gameRunning = useSelector((state) => state.roomInfo.gameRunning);
  const turnRunning = useSelector((state) => state.roomInfo.turnRunning);
  const players = useSelector((state) => state.roomInfo.players);
  const scorePageVisible = useSelector(state=>state.scorePage.isScoreVisible)
  const finalScorePageVisible = useSelector(state=>state.scorePage.isFinalScoreVisible)

  const sketchPad = useRef({});
  const strokeWidthController = useRef();

  const [width, setWidth] = new useState(Math.min(800, window.innerWidth));
  const [height, setHeight] = new useState((window.innerHeight * 57) / 100);
  const [strokeColor, setStrokeColor] = useState("black");
  const [strokeWidth, setStrokeWidth] = useState(4);
  const [strokeWidthControllerVisibility, setStrokeWidthControllerVisibility] = useState(false);


  const StompConnection = useMemo(() => {
    const sock = new SockJS(`${import.meta.env.VITE_WEB_SERVICE_URL}/ws`)
    const con = over(sock);
    con.debug = () => {};
    return con
  }, []);

  const sendSketch = (sketch) => {
    StompConnection.send(
      `/app/drawing/${roomId}`,
      {},
      JSON.stringify({ senderId: playerId, drawing: sketch })
    );
  };

  const getPlayerName = (players, id) => {
    let ans;
    players.forEach((player) => {
      if (player.id === id) ans = player.name;
    });
    return ans;
  };

  const subscribe = () => {
    const sock = new SockJS(`${import.meta.env.VITE_WEB_SERVICE_URL}/ws`)
    const con = over(sock);
    con.debug = () => {};
    con.connect({}, () => {
      con.subscribe(`/topic/drawing/${roomId}`, (sketch) => {
        sketch = JSON.parse(sketch.body);
        if (sketch.senderId !== playerId) {
          sketchPad.current.loadSaveData(sketch.drawing);
        }
      });
      con.subscribe(`/topic/endgame/${roomId}`, data=>{
        data = JSON.parse(data.body)
        if(data.endGame){
          dispatcher(showFinalScorePage())
          dispatcher(endGame())
        }
      })
      con.subscribe(`/topic/newplayer/${roomId}`, (player) => {
        player = JSON.parse(player.body);
        dispatcher(addPlayer(player));
      });
      con.subscribe(`/topic/removeplayer/${roomId}`, (player) => {
        player = JSON.parse(player.body);
        dispatcher(removePlayer(player));
        dispatcher(setOwner(player.newOwner));
      });
      con.subscribe(`/topic/endturn/${roomId}`, (data) => {
        data = JSON.parse(data.body);
        const newPlayers = data.players;
        dispatcher(
          changeDetails({
            players: newPlayers,
            word: data.word,
          })
        );
      });
      con.subscribe(`/topic/roominfo/${roomId}`, (roomInfo) => {
        roomInfo = JSON.parse(roomInfo.body);
        dispatcher(start(roomInfo));
      });
    });
  };

  useEffect(() => {
    document.getElementById("root").addEventListener("click", (e) => {
      if (
        strokeWidthController.current &&
        !strokeWidthController.current.contains(e.target)
      )
        setStrokeWidthControllerVisibility(false);
    });
    window.addEventListener("resize", () => {
      setWidth(Math.min(800, window.innerWidth));
      setHeight((window.innerHeight * 57) / 100);
    });

    subscribe();
  }, []);

  const startGame = () => {
    fetch(`${import.meta.env.VITE_WEB_SERVICE_URL}/game/start`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        roomId: roomId,
        maxRounds: 3,
      }),
    });
  };

  const startTurn = (word) => {
    dispatcher(setWord(word))
    fetch(`${import.meta.env.VITE_WEB_SERVICE_URL}/game/turn/start`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        roomId: roomId,
        word: word,
      }),
    });
  };

  useEffect(()=>{
    sketchPad.current.clear()
  }, [turn])

  return (
    <section id="canvasContainer" className="w-full h-[60%] relative">
      {/* Shown when the game is yet to start */}
      {finalScorePageVisible && <FinalScorePage />}
      {scorePageVisible &&  <ScorePage />}
      {!gameRunning && !finalScorePageVisible && (
        <div className=" z-20 absolute h-full w-full bg-[#000000b1] flex justify-center items-center flex-col">
          {owner === playerId ? (
            <button
              onClick={() => {
                if (players.length === 1) {
                  toast.info("Waiting for more players to join.");
                } else startGame();
              }}
              className="px-3 py-2 font-bold hover:red-400 active:bg-[#fad8de] hover:bg-[#fcb1be] transition-colors bg-pink text-white"
            >
              Start
            </button>
          ) : (
            <span className="text-white">Ask the owner to start the game</span>
          )}
        </div>
      )}
      {/* Shown when the user with turn choosing a word */}
      {gameRunning && !turnRunning && !scorePageVisible &&(
        <div className="z-20 absolute h-full w-full bg-[#000000b2] flex justify-center items-center flex-col">
          {turn === playerId ? (
            <div className="w-fit h-fit flex flex-row justify-center items-center">
              <input
                type="button"
                value={generateSlug(1, {
                  format: "lower",
                })}
                onClick={(e) => startTurn(e.target.value)}
                className="px-2 py-1 m-2 cursor-pointer hover:scale-110 transition-all text-sm font-bold bg-transparent text-white border-white border-2"
              />
              <input
                type="button"
                value={generateSlug(1, {
                  format: "lower",
                })}
                onClick={(e) => startTurn(e.target.value)}
                className="px-2 py-1 m-2 cursor-pointer hover:scale-110 transition-all text-sm font-bold bg-transparent text-white border-white border-2"
              />
              <input
                type="button"
                value={generateSlug(1, {
                  format: "lower",
                })}
                onClick={(e) => startTurn(e.target.value)}
                className="px-2 py-1 m-2 cursor-pointer hover:scale-110 transition-all text-sm font-bold bg-transparent text-white border-white border-2"
              />
            </div>
          ) : (
            <span className="text-white">{`${getPlayerName(
              players,
              turn
            )} is choosing a word.`}</span>
          )}
        </div>
      )}
      <div
        onClick={() => {
          if (playerId == turn) sendSketch(sketchPad.current.getSaveData());
        }}
        className="w-full h-full cursor-pointer flex items-end justify-center"
      >
        <div className="w-full h-full">
          <CanvasDraw
            ref={sketchPad}
            brushRadius={strokeWidth}
            lazyRadius={0}
            brushColor={strokeColor}
            hideGrid={true}
            immediateLoading={true}
            canvasHeight={height}
            canvasWidth={width}
            catenaryColor={playerId!=turn?'white':strokeColor}
            disabled={playerId != turn}
          />
        </div>

        {playerId === turn && (
          <div
            className={` bg-transparent absolute flex justify-center items-center p-1 h-max w-max mb-4 white  rounded-full`}
          >
            <span
              title="Undo"
              onClick={() => {
                sketchPad.current.undo();
              }}
              className={` text-gray-800 h-10 w-10 flex justify-center items-center rounded-full mx-1  hover:scale-125 duration-200 transition-all cursor-pointer bg-white  shadow-sm shadow-black`}
            >
              <i className="pointer-events-none fa-solid fa-rotate-left"></i>
            </span>
            <span
              title="Clear Canvas"
              onClick={() => {
                sketchPad.current.eraseAll();
              }}
              className={`text-gray-800 h-10 w-10 flex justify-center items-center rounded-full mx-1  hover:scale-125 duration-200 transition-all cursor-pointer bg-white  shadow-sm shadow-black`}
            >
              <i className="pointer-events-none fa-solid fa-trash-can"></i>
            </span>
            <span
              title="Stroke color"
              className="h-10 w-10 flex justify-center items-center mx-1 rounded-full hover:scale-125 duration-200 transition-all cursor-pointer bg-white  shadow-sm shadow-black overflow-hidden border-white border-4"
            >
              <input
                className="h-[200%] scale-150 cursor-pointer"
                type="color"
                onChange={(e) => setStrokeColor(e.target.value)}
              ></input>
            </span>
            <div
              ref={strokeWidthController}
              className="flex justify-center flex-col items-center"
            >
              <div
                onClick={() =>
                  setStrokeWidthControllerVisibility(
                    !strokeWidthControllerVisibility
                  )
                }
                title="Stroke Width"
                className="z-10 h-10 w-10 flex justify-center items-center rounded-full mx-1  hover:scale-125 duration-200 transition-all cursor-pointer bg-white  shadow-sm shadow-black"
              >
                <span
                  style={{ height: strokeWidth, width: strokeWidth }}
                  className={`bg-black rounded-full`}
                ></span>
              </div>
              <span
                className={`transition-all duration-300 overflow-hidden bg-white rounded-full pb-10 shadow-md shadow-[#00000055] ${
                  strokeWidthControllerVisibility ? "h-[30vh] " : "h-0"
                } absolute top-1 w-8 flex justify-center`}
              >
                <Slider
                  style={{ marginTop: "3.1rem", height: "85%" }}
                  onChange={(num) => setStrokeWidth(num)}
                  max={16}
                  min={2}
                  progress={true}
                  vertical={true}
                  defaultValue={4}
                />
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Canvas;

