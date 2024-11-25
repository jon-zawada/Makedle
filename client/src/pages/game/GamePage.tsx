import React, { useState } from "react";
import PageLayout from "../../components/common/PageLayout";
import ColorIndicator from "../../components/common/ColorIndicator";
import GuessComponent from "./GuessComponent";
import { useLocation, useParams } from "react-router-dom";
import Button from "../../components/common/Button";
import _isEmpty from "lodash/isEmpty";

export default function GamePage() {
  const [guess, setGuess] = useState<string>("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const { id } = useParams();
  const { state } = useLocation();
  const { name } = state.gameData;

  //make getGameById call if state is empty or just navigate them back to games?

  const guessHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setGuess(value);
  };

  const onSubmitGuess = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setGuesses([...guesses, guess]);
  };

  return (
    <PageLayout title={`${name} - game id ${id}`}>
      <div className="flex flex-col gap-4 p-4 items-center">
        <div>Guess todays {name} champion!</div>
        <div className="flex w-full justify-center">
          <form onSubmit={onSubmitGuess}>
            <input
              name="guess"
              id="guess"
              className="flex-grow px-4 py-2 border rounded-l-md"
              type="text"
              value={guess}
              onChange={guessHandler}
            />
            <Button
              type="submit"
              className="px-4 py-2 border rounded-r-md rounded-l-none"
            >
              Submit
            </Button>
          </form>
        </div>
        {!_isEmpty(guesses) && (
          <GuessComponent
            guesses={guesses}
            primaryColor={state.gameData.primary_color}
            secondaryColor={state.gameData.secondary_color}
            tertiaryColor={state.gameData.tertiary_color}
          />
        )}
        <ColorIndicator
          primaryColor={state.gameData.primary_color}
          secondaryColor={state.gameData.secondary_color}
          tertiaryColor={state.gameData.tertiary_color}
        />
      </div>
    </PageLayout>
  );
}
