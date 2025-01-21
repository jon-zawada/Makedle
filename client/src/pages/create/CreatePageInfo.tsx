import React from "react";
import Button from "../../components/common/Button";
import sampleCsv from "../../assets/csv/sample.csv";

export default function CreatePageInfo() {
  return (
    <div className="flex items-center justify-center my-2">
      <div className="text-center text-xl flex flex-col gap-4 w-[75%]">
        <div className="text-3xl">Welcome to game creation! 🎮</div>
        <div>
          The next step of game creation is uploading a CSV file containing your
          game data.
        </div>
        <div>
          To make things easier, we&apos;ve provided a CSV template that you can
          use as a guide.
        </div>
        <a href={sampleCsv} download="sample.csv">
          <Button>Download Template</Button>
        </a>
      </div>
    </div>
  );
}
