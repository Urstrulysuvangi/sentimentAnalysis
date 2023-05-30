import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className=" w-full overflow-hidden">
      <div className="flex justify-center items-center">
        <Image
          src={"/sentimentanalysis.png"}
          width={300}
          height={300}
          alt="Sentiment Analysis"
        />
      </div>
      <div className="flex justify-center items-center text-4xl">
        What do you want to analyze?
      </div>
      <div className="flex justify-between items-center mx-40 my-20">
        <Link href="/myParagraph">
          <button
            type="button"
            class="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            My own text
          </button>
        </Link>
        <Link href="/news">
          <button
            type="button"
            class="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            News
          </button>
        </Link>
        <Link href="/reviews">
          <button
            type="button"
            class="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-8"
          >
            Reviews
          </button>
        </Link>
      </div>
    </div>
  );
}
