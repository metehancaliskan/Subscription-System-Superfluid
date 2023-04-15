import React, { useState, useContext } from "react";
import { ClientCtx } from "../../context/clientCtx";
// require("@nomiclabs/hardhat-ethers");
// require("@nomiclabs/hardhat-web3");


export const Provider = () => {
  const [nameInput, setNameInput] = useState("");
  const [contractInput, setContractInput] = useState("");
  const [symbolInput, setSymbolInput] = useState("");
  const [rateInput, setRateInput] = useState();

  const { clients, setClients } = useContext(ClientCtx);


  // const host = "0xEB796bdb90fFA0f28255275e16936D25d3418603";
  // const cfa = "0x49e565Ed1bdc17F3d220f72DF0857C26FA83F873";
  // const acceptedToken = "0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f";
  const handleFormSubmit = (e) => {
    e.preventDefault();
    let object = { name: nameInput, contract: contractInput, symbol: symbolInput, rate: rateInput };

    console.log(object);
    

    setClients([...clients, object]);

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
            <label htmlFor="contract" className="text-start  font-semibold">
              contract address
            </label>
            <input
              className="rounded-2xl"
              id="contract"
              type="text"
              onChange={(e) => {
                setContractInput(e.target.value);
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
          <div className="flex flex-col">
            <label htmlFor="name" className="text-start  font-semibold">
              FlowRate
            </label>
            <input
              className="rounded-2xl"
              id="rate"
              type="number"
              onChange={(e) => {
                setRateInput(e.target.value);
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
