import React, { createContext, useState } from "react";

// 🔁 Replace this with your actual Sheet.best URL
const API_URL = "https://api.sheetbest.com/sheets/88141cba-f544-477b-ba62-a971268e9c4e";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [clientName] = useState("AboveAllStaffing");
  const [selectedMonth, setSelectedMonth] = useState("May 2025");
  const [selectedPersona, setSelectedPersona] = useState("Operations");
  const [counts, setCounts] = useState([0, 0, 0, 0, 0, 0]);
  const [data, setData] = useState({});

  const months = [
    "Jan 2025", "Feb 2025", "Mar  2025", "Apr 2025",
    "May 2025", "Jun 2025", "Jul 2025", "Aug 2025",
    "Sep 2025", "Oct 2025", "Nov 2025", "Dec 2025"
  ];

  const personas = ["Operations", "Project Management", "HR/Talent Acquisition"];

  const updateData = async (clientName, month, persona, counts, weekOf) => {
    const key = `${clientName}_${month}_${persona}`;

    // ✅ This updates the local state so the dashboard updates in real time
    const newData = { ...data, [key]: counts };
    setData(newData);

    // ✅ This sends data to your Google Sheet via Sheet.best
    const payload = {
      "Client Name": clientName,
      "Month": month,
      "Week of": weekOf,
      "Persona": persona,
      "Outreach": counts[0],
      "Connections": counts[1],
      "Replies": counts[2],
      "Meetings": counts[3],
      "Proposals": counts[4],
      "Contracts": counts[5],
    };

    console.log("🔄 Sending to Sheet.best:", payload);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      console.log("✅ Sheet.best response:", result);
    } catch (error) {
      console.error("❌ Error saving data:", error);
    }
  };

  return (
    <DataContext.Provider
      value={{
        clientName,
        months,
        personas,
        selectedMonth,
        setSelectedMonth,
        selectedPersona,
        setSelectedPersona,
        counts,
        setCounts,
        updateData,
        data,
        setData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
