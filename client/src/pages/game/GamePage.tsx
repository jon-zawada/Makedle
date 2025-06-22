import React, { useEffect, useState } from "react";
import PageLayout from "../../components/common/PageLayout";
import ColorIndicator from "../../components/common/ColorIndicator";
import GuessComponent from "./GuessComponent";
import { useLocation, useParams } from "react-router-dom";
import _isEmpty from "lodash/isEmpty";
import useHttpService from "../../api/useHttpService";
import { getRandomInt } from "../../utils/utils";
import { useAuth } from "../../context/AuthProvider";
import GameWonBanner from "./GameWonBanner";
import GuessInput from "./GuessInput";

type Header = {
  header_name: string;
};

export type WordData = {
  header_name: string;
  value: string;
};

export type Word = {
  word_id: number;
  word_data: WordData[];
};

type WordList = Word[];

export default function GamePage() {
  const [guess, setGuess] = useState<string>("");
  const [guesses, setGuesses] = useState<Word[]>([]);
  const [originalWords, setOriginalWords] = useState<WordList>([]);
  const [words, setWords] = useState<WordList>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [wordOfDay, setWordOfDay] = useState<Word | null>(null);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const httpService = useHttpService();
  const { id } = useParams();
  const { state } = useLocation();
  const { name } = state.gameData;
  const { appUser } = useAuth();

  //make getGameById call if state is empty or just navigate them back to games?

  useEffect(() => {
    getWords();
  }, [id]);

  useEffect(() => {
    if (!_isEmpty(guesses) && !_isEmpty(wordOfDay)) {
      const latestGuess = guesses[0];
      if (latestGuess.word_id === wordOfDay.word_id) {
        setGameWon(true);
        postGameResult();
      }
    }
  }, [guesses]);

  const postGameResult = () => {
    if (appUser) {
      httpService
        .post(`/results/${id}`, { gameWon: true })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };

  const reset = () => {
    setGuesses([]);
    setWordOfDay(getRandomWordOfDay(words));
    setGameWon(false);
    setWords(originalWords);
  };

  const getWords = () => {
    httpService
      .get(`/games/${id}/words`)
      .then((res) => {
        setWords(res.data.words);
        setOriginalWords(res.data.words);
        setWordOfDay(getRandomWordOfDay(res.data.words));
        setHeaders(
          res.data.headers.map((header: Header) => header.header_name)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const guessHandler = (input: string) => {
    setGuess(input);
  };

  const onGuessSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newGuess = findByHeaderName(words, guess);
    if (newGuess) {
      const remainingWords = words.filter(
        (word) => word.word_id !== newGuess.word_id
      );
      setWords(remainingWords);
      setGuesses([newGuess, ...guesses]);
    }
    setGuess("");
  };

  const autoCompleteOptions = words
    .filter((word) => {
      const wData = word.word_data;
      const name = wData.find(
        (header) => header.header_name === "Name"
      )?.value;
      return name
        ?.split(" ")
        .some((word) => word.toLowerCase().startsWith(guess.toLowerCase()));
    }).map((word) => {
      const wData = word.word_data;
      const name =
        wData.find((header) => header.header_name === "Name")?.value || "";
      return name
    });

  const findByHeaderName = (data: WordList, guess: string) => {
    return (
      data.find((entry) =>
        entry.word_data.some((item) => item.value === guess)
      ) || null
    );
  };

  const getRandomWordOfDay = (words: WordList): Word => {
    return words[getRandomInt(words.length)];
  };

  const {primary_color, secondary_color, tertiary_color} = state.gameData;
  return (
    <PageLayout title={name}>
      <div className="flex flex-col gap-4 p-4 items-center">
        <div>Guess todays {name} champion!</div>
        <GuessInput
          guess={guess}
          options={autoCompleteOptions}
          onGuessChange={guessHandler}
          onGuessSubmit={onGuessSubmit}
          isDisabled={gameWon}
        />
        {!_isEmpty(guesses) && (
          <GuessComponent
            guesses={guesses}
            headers={headers}
            wordOfDay={wordOfDay}
            primaryColor={primary_color}
            secondaryColor={secondary_color}
            tertiaryColor={tertiary_color}
          />
        )}
        <ColorIndicator
          primaryColor={primary_color}
          secondaryColor={secondary_color}
          tertiaryColor={tertiary_color}
        />
        {gameWon && ( //and animation is done
          <GameWonBanner
            wordOfDay={wordOfDay}
            guessCount={guesses.length}
            reset={reset}
          />
        )}
      </div>
    </PageLayout>
  );
}
