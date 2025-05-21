import { createContext, useContext, useEffect, useState } from 'react';

const DataContext = createContext();
export const useData = () => useContext(DataContext);

const API_URL = "https://v1.nocodeapi.com/lilebrian/google_sheets/PhVOReqOSbWgtVFA?tabId=Above All Staffing";

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

  const row = [clientName, month, persona, ...counts];

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: [row]
      })
    });
  } catch (error) {
    console.error("Error saving data to NoCodeAPI:", error);
  }
};

  return (
    <DataContext.Provider value={{ data, updateData }}>
      {children}
    </DataContext.Provider>
  );
}
