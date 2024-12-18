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
import Modal from "../../components/common/Modal";
import { getRandomInt } from "../../utils/utils";

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
  const [originalWords, setOriginalWords] = useState<WordList>([]);
  const [words, setWords] = useState<WordList>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [wordOfDay, setWordOfDay] = useState<Word | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [gameIsWon, setGameIsWon] = useState<boolean>(false);
  const httpService = useHttpService();
  const menuRef = useRef<HTMLDivElement>(null);
  const { id } = useParams();
  const { state } = useLocation();
  const { name } = state.gameData;

  //make getGameById call if state is empty or just navigate them back to games?

  useEffect(() => {
    getWords();
  }, [id]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMenuOpen(!_isEmpty(guess));
  }, [guess]);

  useEffect(() => {
    if (!_isEmpty(guesses) && !_isEmpty(wordOfDay)) {
      const latestGuess = guesses[0];
      if (latestGuess.word_id === wordOfDay.word_id) {
        setShowModal(true);
        setGameIsWon(true);
      }
    }
  }, [guesses]);

  const reset = () => {
    setGuesses([]);
    setWordOfDay(getRandomWordOfDay(words));
    setGameIsWon(false);
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
      const remainingWords = words.filter(
        (word) => word.word_id !== newGuess.word_id
      );
      setWords(remainingWords);
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

  const getRandomWordOfDay = (words: WordList): Word => {
    return words[getRandomInt(words.length)];
  };

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
            wordOfDay={wordOfDay}
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
        {gameIsWon && <Button onClick={reset}>Play again</Button>}
      </div>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="py-5 flex flex-col items-center justify-center gap-4">
          <div>Congratulations</div>
        </div>
      </Modal>
    </PageLayout>
  );
}
