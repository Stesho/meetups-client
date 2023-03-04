import { JSONFile, Low } from "lowdb";
import { generateInitialData } from "./generateInitialData.mjs";

const isEmptyObject = (obj) => {
  for (const key in obj) {
    return false;
  }
  return true; 
}

export const initDataBase = async () => {
  const adapter = new JSONFile("db.json");
  const db = new Low(adapter);
  await db.read();
  if (isEmptyObject(db.data)) {
    db.data = generateInitialData();
    await db.write();
  }

  return db;
};
