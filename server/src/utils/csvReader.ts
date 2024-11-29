import fs from "fs";
import csv from "csv-parser";
import { Header } from "../Models/Header";
import { Word } from "../Models/Word";

export function processGameCSV(
  csvFile: Express.Multer.File,
  gameId: number,
  createHeader: (
    gameId: number,
    orderIndex: number,
    header: string
  ) => Promise<Header>,
  createWord: (
    gameId: number,
    headerId: string,
    wordId: number,
    word: string
  ) => Promise<Word>
): Promise<void> {
  return new Promise((resolve, reject) => {
    const headersMap = new Map();
    const headerReader = fs.createReadStream(csvFile.path);
    let headerIndex = 1;
    headerReader.pipe(csv()).on("headers", async (headers) => {
      try {
        for (const header of headers) {
          const orderIndex = headerIndex++;
          const result = await createHeader(gameId, orderIndex, header);
          const headerId = result?.id;
          if (headerId) {
            headersMap.set(header, headerId);
          }
        }
        readRowValues(csvFile, headersMap, gameId, createWord)
          .then(() => resolve())
          .catch((error) => reject(error));
      } catch (error) {
        reject(error);
      }
    });
  });
}

function readRowValues(
  csvFile: Express.Multer.File,
  headersMap: Map<string, string>,
  gameId: number,
  createWord: (
    gameId: number,
    headerId: string,
    wordId: number,
    word: string
  ) => Promise<Word>
): Promise<void> {
  return new Promise((resolve, reject) => {
    const rowReader = fs.createReadStream(csvFile.path);
    let rowIndex = 1;
    rowReader
      .pipe(csv())
      .on("data", async (row) => {
        const wordId = rowIndex++;
        try {
          for (const [header, headerId] of headersMap.entries()) {
            const word = row[header];
            await createWord(gameId, headerId, wordId, word);
          }
        } catch (error) {
          reject(error);
        }
      })
      .on("end", () => {
        fs.unlinkSync(csvFile.path);
        resolve();
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}
