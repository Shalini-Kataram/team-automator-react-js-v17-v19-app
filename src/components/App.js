import React from "react";
import "../styles/App.scss";
import StatusLine from "./StatusLine";
import { TaskProvider } from "./TaskContext";

function App() {
  return (
    <TaskProvider>
      <div className="relative font-kanit bg-[#1B2430] text-gray-100 flex flex-col items-center text-center w-full min-h-screen">
        <main className="flex flex-col items-center justify-start min-h-screen w-full">
          <h1
            className="mt-8 mb-4 font-bold text-4xl text-[#F5F5F5]"
            data-testid="app-title"
          >
            Task Management
          </h1>
          <section className="flex flex-wrap justify-center gap-4 w-full sm:w-4/5 max-w-7xl px-4 py-8 rounded shadow-lg bg-gray-800">
            <StatusLine />
          </section>
        </main>
      </div>
    </TaskProvider>
  );
}

export default App;
