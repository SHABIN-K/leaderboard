import { ClipLoader } from "react-spinners";

const WaitingLoader = ({ size, color }: { size: number; color: string }) => {
  return <ClipLoader size={size} color={color} />;
};

export { WaitingLoader };
