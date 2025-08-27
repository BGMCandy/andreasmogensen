import Image from "next/image";
import BgVideo from "./index/components/bgVideo";

export default function Home() {
  return (
    <>
      <BgVideo />
      <div className="relative z-10 font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <div className="text-center">
        </div>
      </div>
    </>
  );
}
