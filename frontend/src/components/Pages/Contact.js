import React, { useState, useContext } from "react";
import { ClientCtx } from "../../context/clientCtx";
export const Contact = () => {
  const [nameInput, setNameInput] = useState("");
  const [walletInput, setWalletInput] = useState("");
  const [symbolInput, setSymbolInput] = useState("");

  const { clients, setClients } = useContext(ClientCtx);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let object = { name: nameInput, wallet: walletInput, symbol: symbolInput };
    console.log(object);

    setClients(...clients, object);

    //set user's wallet adress and the input field values to realted form object.

    //use the input field values as formInput
    //set the new client into the clients Context like this:
    //setClients(...clients, {NEW CLIENT OBJECT})
  };

  return (
    <div>
      <form
        className="flex flex-col mt-2 gap-2 container m-auto"
        onSubmit={handleFormSubmit}
      >
        <div className="flex justify-center gap-8">
          <div className="flex flex-col">
            <label htmlFor="wallet" className="text-start  font-semibold">
              Wallet
            </label>
            <input
              className="rounded-2xl"
              id="wallet"
              type="text"
              onChange={(e) => {
                setWalletInput(e.target.value);
              }}
            ></input>
          </div>
          <div className="flex flex-col">
            <label htmlFor="name" className="text-start  font-semibold">
              Name
            </label>
            <input
              className="rounded-2xl"
              id="name"
              type="text"
              onChange={(e) => {
                setNameInput(e.target.value);
              }}
            ></input>
          </div>
          <div className="flex flex-col">
            <label htmlFor="symbol" className="text-start  font-semibold">
              Symbol
            </label>
            <input
              className="rounded-2xl"
              id="symbol"
              type="text"
              onChange={(e) => {
                setSymbolInput(e.target.value);
              }}
            ></input>
          </div>
        </div>
        <button
          type="submit"
          className="w-36 self-center border rounded-md bg-slate-700 text-white hover:scale-105 transition-all active:bg-white active:text-slate-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
