import { db } from "../firebase";
import { rawData } from "./RawData.js";

export class Database {
  constructor(collectionName, docName) {
    this.collectionName = collectionName;
    this.docName = docName;

    this.read();
  }

  read() {
    this.readPromise = db
      .collection(this.collectionName)
      .doc(this.docName)
      .get()
      .then((doc) => {
        this.data = doc.data();
      })
      .catch((error) => {
        console.error(`Error fetching from collection ${this.collectionName} / document ${this.docName} - ${error}`);
      });
  }

  write() {
    // Load file
    let newRatings = {};
    const lines = rawData.split("\n");
    const keys = lines[0].split(",");

    for (let i = 1; i < lines.length; ++i) {
      const tokens = lines[i].split(",");
      const ratings = {};

      for (let j = 1; j < tokens.length; ++j) {
        const name = keys[j];
        let value = 0;

        const valStr = tokens[j];
        if (!!valStr) {
          value = parseFloat(valStr);
        }

        if (value > 0) {
          ratings[name] = value;
        }
      }

      newRatings[tokens[0]] = ratings;
    }

    this.data = newRatings;
    db.collection(this.collectionName).doc(this.docName).set(this.data);
  }
}
