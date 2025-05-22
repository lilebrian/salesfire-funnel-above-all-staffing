import React, { useContext, useState } from "react";
import { DataContext } from "./DataContext";

export default function AdminPanel() {
  const {
    clientName,
    months,
    personas,
    counts,
    setCounts,
    selectedMonth,
    setSelectedMonth,
    selectedPersona,
    setSelectedPersona,
    updateData,
  } = useContext(DataContext);

  const [weekOf, setWeekOf] = useState("");

  const handleChange = (index, value) => {
    const newCounts = [...counts];
    newCounts[index] = parseInt(value) || 0;
    setCounts(newCounts);
  };

  const handleSave = async () => {
    await updateData(clientName, selectedMonth, selectedPersona, counts, weekOf);
    alert("Data saved to Google Sheet!");
  };

  return (
    <div
  style={{
    width: "100%",
    maxWidth: "20rem",
    padding: "1rem",
    backgroundColor: "#0B111D",
    borderRight: "1px solid #2c2c2c",
    height: "auto",
  }}
>

      }}
    >
      <h2 className="text-lg font-bold mb-4 text-white">Admin Panel</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-white">Month</label>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
        >
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-white">Week of</label>
        <input
          type="text"
          value={weekOf}
          onChange={(e) => setWeekOf(e.target.value)}
          placeholder="e.g. May 20–26"
          className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-white">Persona</label>
        <select
          value={selectedPersona}
          onChange={(e) => setSelectedPersona(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
        >
          {personas.map((persona) => (
            <option key={persona} value={persona}>
              {persona}
            </option>
          ))}
        </select>
      </div>

      {[
        "Outreach",
        "Connections",
        "Replies",
        "Meetings",
        "Proposals",
        "Contracts",
      ].map((label, index) => (
        <div key={label} className="mb-2">
          <label className="block text-sm font-medium mb-1 text-white">
            {label}
          </label>
          <input
            type="number"
            value={counts[index]}
            onChange={(e) => handleChange(index, e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
          />
        </div>
      ))}

      <button
        onClick={handleSave}
        className="mt-4 w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
      >
        Save
      </button>
    </div>
  );
}
