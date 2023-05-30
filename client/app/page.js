import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className=" w-full overflow-hidden bg-primary">
      <div className="flex flex-wrap justify-center items-center">
        <div className="w-1/2 p-4">
          {/* Left section */}
          <h1 className="font-poppins font-semibold text-6xl text-white text-right">
            The Ultimate
            <div className="p-4">
              <span className="text-gradient">Sentiment</span>{" "}
            </div>
            Analyzer
          </h1>
        </div>
        <div className="w-1/2 p-8 relative">
          {/* Right section */}
          <Image src="/robot.png" width={400} height={400} className="z-[5 ]" />
          {/* gradient start */}
          <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
          <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
          <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
          {/* gradient end */}
        </div>
      </div>

      <div className="flex justify-between items-center mx-40 my-20">
        <Link href="/myParagraph">
          <div
            className={`flex justify-center items-center  w-[140px] h-[140px] rounded-full bg-blue-gradient p-[2px] cursor-pointer`}
          >
            <div
              className={`flex justify-center items-center flex-col bg-primary w-[100%] h-[100%] rounded-full`}
            >
              <div className={`flex justify-center items-start flex-row`}>
                <p className="font-poppins font-medium text-[18px] leading-[23.4px]">
                  <span className="text-gradient">Text</span>
                </p>
              </div>

              <p className="font-poppins font-medium text-[18px] leading-[23.4px]">
                <span className="text-gradient">Analysis</span>
              </p>
            </div>
          </div>
        </Link>
        <Link href="/news">
          <div
            className={`flex justify-center items-center  w-[140px] h-[140px] rounded-full bg-blue-gradient p-[2px] cursor-pointer`}
          >
            <div
              className={`flex justify-center items-center flex-col bg-primary w-[100%] h-[100%] rounded-full`}
            >
              <div className={`flex justify-center items-start flex-row`}>
                <p className="font-poppins font-medium text-[18px] leading-[23.4px]">
                  <span className="text-gradient">News</span>
                </p>
              </div>

              <p className="font-poppins font-medium text-[18px] leading-[23.4px]">
                <span className="text-gradient">Analysis</span>
              </p>
            </div>
          </div>
        </Link>
        <Link href="/reviews">
          <div
            className={`flex justify-center items-center  w-[140px] h-[140px] rounded-full bg-blue-gradient p-[2px] cursor-pointer`}
          >
            <div
              className={`flex justify-center items-center flex-col bg-primary w-[100%] h-[100%] rounded-full`}
            >
              <div className={`flex justify-center items-start flex-row`}>
                <p className="font-poppins font-medium text-[18px] leading-[23.4px]">
                  <span className="text-gradient">Review</span>
                </p>
              </div>

              <p className="font-poppins font-medium text-[18px] leading-[23.4px]">
                <span className="text-gradient">Analysis</span>
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
