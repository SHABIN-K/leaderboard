import CountUp from "react-countup";

interface TeamDataType {
  name: string;
  logo: string;
  total_points: number;
  rank: number;
}

const TopCard: React.FC<{ teamData: TeamDataType }> = ({ teamData }) => {
  const styleTopCard = {
    container: "flex-center m-auto rounded-[6px] w-full flex-col",
    font: "font-medium text-darkwhite text-center tracking-[0.8px]",
  };

  return (
    <div
      className={`${styleTopCard.container}  relative p-2 shadow-[0_0_4px_rgba(50,69,107,0.2)] z-[1] overflow-hidden`}
    >
      <div className={`${styleTopCard.container} bg-primarylight`}>
        <h2
          className={`${styleTopCard.font} mt-2.5 mb-0 mx-auto text-4xl font-codefont `}
        >
          <CountUp end={teamData.total_points} duration={1.75} />
        </h2>
        <p
          className={`${styleTopCard.font} -mt-[2px] mb-2.5 mx-auto text-lg font-mainfont`}
        >
          Points
        </p>
        <span className="-mt-[2px] mb-2.5 mx-auto px-5 py-1 text-xl font-medium font-codefont text-lightblack bg-darkwhite text-center tracking-[0.2px] rounded-[4px]">
          Rank: {teamData.rank}
        </span>
      </div>
      <div className="flex flex-col items-center mt-4">
        <div className="w-24 h-24 relative rounded-full overflow-hidden shadow lg:w-20 lg:h-20">
          <img
            src={teamData.logo}
            alt={`${teamData.name} logo`}
            className="w-full h-full user_image"
          />
        </div>
        <h1 className="my-2 mx-auto text-4xl font-mallufont text-darkblack text-center tracking-[-0.05em]">
          {teamData.name}
        </h1>
        <button className="m-auto mb-1.5 px-3 py-1 text-lg font-bold font-curlfont text-sky-600 bg-sky-100 hover:bg-sky-200 text-center rounded-full transition">
          View Details
        </button>
      </div>
    </div>
  );
};

export default TopCard;
