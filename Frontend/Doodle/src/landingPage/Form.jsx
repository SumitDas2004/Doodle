import React from "react";
import CreateRoomForm from "./CreateRoomForm";
import JoinRoomForm from "./JoinRoomForm";
import { useSelector } from "react-redux";

const Form = ({ toggleFormState, formState }) => {
  const isJoiningRoom = useSelector((state) => state.isJoiningRoom.value);

  return (
    <section
      className={`${
        isJoiningRoom
          ? "w-[34vh] h-[30vh] overflow-hidden"
          : " h-[60vh] phone:w-[97%] tablet:w-[94%]"
      } min-h-[450px] transition-all duration-200 flex justify-center items-center relative max-w-[600px]`}
    >
      <section className="bg-frontBlue h-[65%] w-[100%] rounded-sm flex shadow-lg shadow-[#0000002f]">
        {!isJoiningRoom && (
          <>
            <div className="h-full w-1/2 flex justify-center items-center">
              <div className="w-1/2 h-[100%] flex flex-col  justify-center items-center">
                <span className="pacifico-regular font-bold text-4xl mb-6">
                  Doodle
                </span>
                <span className="inline-block break-all font-white w-11/12 text-white  font-bold mb-6">Don't have a roomId?</span>
                
                <button
                  onClick={toggleFormState}
                  className="px-2 py-2 w-max border-white border-2 rounded-sm font-semibold text-white cursor-pointer z-10"
                >
                  Create Room
                </button>
              </div>
            </div>
            <div className="h-full w-1/2 flex justify-center items-center">
              <div className="w-1/2 h-[100%] flex items-center flex-col justify-center">
                <span className="pacifico-regular font-bold text-4xl mb-6">
                  Doodle
                </span>
                <span className="inline-block break-all font-white w-11/12 text-white  font-bold mb-6">Have a roomId?</span>
                <button
                  onClick={toggleFormState}
                  className=" rounded-sm px-2 w-max py-2 border-white border-2 font-semibold text-white z-10 cursor-pointer"
                >
                  Join Room
                </button>
              </div>
            </div>
          </>
        )}
      </section>
      {!isJoiningRoom && (
        <>
          <section className="h-full phone:w-[96%] tablet:w-[94%] absolute flex justify-center items-center">
            <CreateRoomForm formState={formState} />
            <JoinRoomForm formState={formState} />
          </section>
        </>
      )}
    </section>
  );
};

export default Form;
