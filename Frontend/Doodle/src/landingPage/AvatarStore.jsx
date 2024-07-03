import React, { useEffect, useState } from "react";

const AvatarStore = ({className, setPlayerAvatar}) => {
  const seeds = [
    "Oscar",
    "Felix",
    "Sasha",
    "Bob",
    "Pumpkin",
    "Sadie",
    "Rockie",
    "Abby",
    "Bubba",
    "Bailey",
    "Smokey",
    "Boo",
    "Snuggles",
    "Scooter",
    "Bandit",
    "Leo",
    "Precious",
    "Snickers",
    "Mittens",
    "Baby",
    "Annie",
    "Lily",
    "Max",
    "Cali",
    "Gizmo",
    "Simba",
    "Socks",
    "Snowball",
    "Zoe",
    "Jack",
    "Harley"
  ];
  const [currentSeed, setCurrentSeed] = useState(parseInt(Math.random()*100%seeds.length));
  useEffect(()=>{
    setPlayerAvatar(`https://api.dicebear.com/9.x/adventurer/svg?seed=${seeds[currentSeed]}`)
  }, [currentSeed])
  return (
    <div className={`${className} relative transition-all duration-500 w-max h-max flex flex-col justify-center items-center`}>
        <span className=" bottom-arrow animate-bounce text-white font-bold bg-pink py-1 px-3 text-sm rounded-full ">{seeds[currentSeed]}</span>
      <div className="h-28 w-28 flex justify-center items-center">
        <button
        className="text-slate-600"
          onClick={() =>
            setCurrentSeed((currentSeed - 1 + seeds.length) % seeds.length)
          }
        title="Prev Avatar"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <img
          src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${seeds[currentSeed]}`}
          alt="avatar"
          className="h-full w-full"
        />
        <button
        className="text-slate-600"
        title="Next Avatar"
          onClick={() => setCurrentSeed((currentSeed + 1) % seeds.length)}
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default AvatarStore;
