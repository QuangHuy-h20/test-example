import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [ticket, setTicket] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      const response = await axios.get("http://localhost:5000/api/tickets");
      setTickets(response.data);
    };
    fetchTickets();
  }, []);

  const addTicket = async () => {
    if (ticket) {
      const response = await axios.post("http://localhost:5000/api/tickets", {
        title: ticket,
      });
      setTickets([...tickets, response.data]);
      setTicket("");
    }
  };

  return (
    <div>
      <h1>Kanban Tickets</h1>
      <input
        type="text"
        value={ticket}
        onChange={(e) => setTicket(e.target.value)}
        placeholder="Add a new ticket"
      />
      <button onClick={addTicket}>Add Ticket</button>
      <ul>
        {tickets.map((t) => (
          <li key={t._id}>{t.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
