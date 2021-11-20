import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MessageProvider } from "./context/MessageContext";
import { WalletProvider } from "./context/WalletContext";
import { TransactionProvider } from "./context/TransactionContext";
import { BootcampProvider } from "./context/BootcampContext";

ReactDOM.render(
  <React.StrictMode>
    <MessageProvider>
      <WalletProvider>
        <TransactionProvider>
          <BootcampProvider>
            <App />
          </BootcampProvider>
        </TransactionProvider>
      </WalletProvider>
    </MessageProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
