import React, { useEffect, useRef, useState } from "react";
import PageLayout from "../../components/common/PageLayout";
import ColorIndicator from "../../components/common/ColorIndicator";
import GuessComponent from "./GuessComponent";
import { useLocation, useParams } from "react-router-dom";
import Button from "../../components/common/Button";
import _isEmpty from "lodash/isEmpty";
import useHttpService from "../../api/useHttpService";
import DropdownMenu, {
  IDropdownMenuItems,
} from "../../components/common/DropdownMenu";

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
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [words, setWords] = useState<WordList>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [correct, setCorrect] = useState<Word | null>(null);
  const httpService = useHttpService();
  const menuRef = useRef<HTMLDivElement>(null);
  const { id } = useParams();
  const { state } = useLocation();
  const { name } = state.gameData;

  //make getGameById call if state is empty or just navigate them back to games?

  useEffect(() => {
    getWords();
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (_isEmpty(guess)) {
      setMenuOpen(false);
    } else if (!menuOpen) {
      setMenuOpen(true);
    }
  }, [guess]);

  const getWords = () => {
    httpService
      .get(`/games/${id}/words`)
      .then((res) => {
        setWords(res.data.words);
        setCorrect(getRandomCorrect(res.data.words));
        setHeaders(
          res.data.headers.map((header: Header) => header.header_name)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      !(event.target as HTMLElement).closest("button")
    ) {
      setMenuOpen(false);
    }
  };

  const guessHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setGuess(value);
  };

  const onSubmitGuess = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newGuess = findByHeaderName(words, guess);
    if (newGuess) {
      setGuesses([newGuess, ...guesses]);
    }
    setGuess("");
  };

  const renderDropdownHint = (): IDropdownMenuItems[] => {
    if (!guess || !words) return [];

    return words
      .filter((word) => {
        const wData = word.word_data;
        const name = wData.find(
          (header) => header.header_name === "Name"
        )?.value;
        return name?.toLowerCase().startsWith(guess.toLowerCase());
      })
      .map((word) => {
        const wData = word.word_data;
        const name =
          wData.find((header) => header.header_name === "Name")?.value || "";
        return {
          name,
          onClick: () => setGuess(name),
        };
      });
  };

  const findByHeaderName = (data: WordList, guess: string) => {
    return (
      data.find((entry) =>
        entry.word_data.some((item) => item.value === guess)
      ) || null
    );
  };

  const getRandomCorrect = (words: WordList): Word => {
    return words[getRandomInt(words.length)];
  };

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  return (
    <PageLayout title={name}>
      <div className="flex flex-col gap-4 p-4 items-center">
        <div>Guess todays {name} champion!</div>
        <div className="flex justify-center relative">
          <form onSubmit={onSubmitGuess}>
            <input
              name="guess"
              id="guess"
              className="flex-grow px-4 py-2 border rounded-l-md"
              type="text"
              value={guess}
              onChange={guessHandler}
              autoComplete="off"
            />
            <DropdownMenu
              isOpen={menuOpen}
              menuRef={menuRef}
              items={renderDropdownHint()}
              fitParent
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
            headers={headers}
            correct={correct}
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
