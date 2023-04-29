import React, { useState, useEffect } from "react";
import "./App.css";
import question from "./assets/question.png";
import { Comment } from "react-loader-spinner";

export const App = () => {
   const [prompt, setPrompt] = useState("");
   const [loading, setLoading] = useState(false);
   const [response, setResponse] = useState();

   useEffect(() => {
      if (prompt === "") {
         setResponse(undefined);
      }
   }, [prompt]);

   const sendPrompt = async (event) => {
      if (event.key !== "Enter") {
         return;
      }
      try {
         setLoading(true);

         const requestConfig = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt }),
         };

         const res = await fetch("/api/ask", requestConfig);

         const { message } = await res.json();
         setResponse(message);
         console.log(message);
      } catch (err) {
         console.log(err.message);
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="app">
         <div className="app-wrapper">
            <div className="window-chat">
               <div className="window-chat__answer">{response}</div>
               <div className="window-chat__frameIn">
                  {loading ? (
                     <Comment
                        height="42"
                        width="42"
                        wrapperStyle={{ padding: 8 }}
                        color="#fff"
                        backgroundColor="#8809bb"
                     />
                  ) : (
                     <img className="question" src={question} alt="question" />
                  )}

                  <input
                     type="text"
                     className="window-chat__input"
                     placeholder="Что ты хочешь узнать?"
                     value={prompt}
                     onChange={(e) => setPrompt(e.target.value)}
                     onKeyDown={(e) => sendPrompt(e)}
                  />
               </div>
            </div>
         </div>
      </div>
   );
};
