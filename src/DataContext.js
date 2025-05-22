import { createContext, useContext, useEffect, useState } from 'react';

const DataContext = createContext();
export const useData = () => useContext(DataContext);

const API_URL = "https://api.sheetbest.com/sheets/88141cba-f544-477b-ba62-a971268e9c4e";

export function DataProvider({ children }) {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((rows) => {
        const structured = {};
        rows.forEach((row) => {
          const key = `${row["Client Name"]}_${row["Month"]}_${row["Persona"]}`;
          structured[key] = [
            row["Outreach"],
            row["Connections"],
            row["Replies"],
            row["Meetings"],
            row["Proposals"],
            row["Contracts"]
          ].map(n => parseInt(n) || 0);
        });
        setData(structured);
      });
  }, []);

 const updateData = async (clientName, month, persona, counts) => {
  const key = `${clientName}_${month}_${persona}`;
  const newData = { ...data, [key]: counts };
  setData(newData);

  const payload = {
    "Client Name": clientName,
    "Month": month,
    "Persona": persona,
    "Outreach": counts[0],
    "Connections": counts[1],
    "Replies": counts[2],
    "Meetings": counts[3],
    "Proposals": counts[4],
    "Contracts": counts[5]
  };

  console.log("🔄 Sending to Sheet.best:", payload);

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
  } catch (error) {
    console.error("❌ Error saving data:", error);
  }
};

  return (
    <DataContext.Provider value={{ data, updateData }}>
      {children}
    </DataContext.Provider>
  );
}
