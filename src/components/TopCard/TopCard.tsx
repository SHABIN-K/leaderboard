const TopCard = () => {
  const styleTopCard = {
    container: "flex-center m-auto rounded-[6px] w-full flex-col",
    font: "font-medium text-darkwhite text-center tracking-[0.8px]",
  };
  return (
    <div
      className={`${styleTopCard.container} bg-darkwhite relative p-2 shadow-[0_0_4px_rgba(50,69,107,0.2)] z-[1] overflow-hidden`}
    >
      <div className={`${styleTopCard.container} bg-primarylight`}>
        <h2
          className={`${styleTopCard.font} mt-2.5 mb-0 mx-auto text-4xl font-codefont `}
        >
          453
        </h2>
        <p
          className={`${styleTopCard.font} -mt-[2px] mb-2.5 mx-auto text-lg font-mainfont`}
        >
          Points
        </p>
      </div>
      <div className="flex flex-col items-center mt-4">
        <div className="w-24 h-24 relative rounded-full overflow-hidden shadow lg:w-20 lg:h-20">
          <img
            src="/team_logo.png"
            alt="team logo"
            className="w-full h-full user_image"
          />
        </div>
        <h1 className="my-2 mx-auto text-2xl font-medium font-codefont text-darkblack text-center tracking-[0.8px]">
          Team Name
        </h1>
        <button className="m-auto mb-1.5 px-3 py-1 text-lg font-bold font-curlfont text-sky-600 bg-sky-100 hover:bg-sky-200 text-center rounded-full transition">
          View All
        </button>
      </div>
    </div>
  );
};

export default TopCard;
