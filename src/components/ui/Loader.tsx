import { PuffLoader, ClipLoader } from "react-spinners";

const WaitingLoader = ({ size, color }: { size: number; color: string }) => {
  return <ClipLoader size={size} color={color} />;
};

const Loader = () => {
  return (
    <div className="flex-center h-[100vh]">
      <PuffLoader size={65} color="#000000" />
    </div>
  );
};

export { WaitingLoader, Loader };
