const TopCard = () => {
  return (
    <div className="relative m-auto p-2 w-full flex justify-center items-center flex-col bg-darkwhite shadow-[0_0_4px_rgba(50,69,107,0.2)] rounded-[6px] z-[1] overflow-hidden">
      <div className="m-auto w-full flex justify-center items-center flex-col bg-primarylight rounded-[6px]">
        <h2 className="mt-2.5 mb-0 mx-auto text-4xl font-medium font-codefont text-darkwhite text-center tracking-[0.8px]">
          453
        </h2>
        <p className="-mt-[2px] mb-2.5 mx-auto text-lg font-medium font-mainfont text-darkwhite text-center tracking-[0.8px]">
          Points
        </p>
      </div>
    </div>
  );
};

export default TopCard;
