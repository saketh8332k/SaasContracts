// src/utils/api.js
export const fetchContracts = () => {
  return fetch("/contracts.json").then((res) => res.json());
};

export const fetchContractDetail = (id) => {
  return fetch(`/contracts-${id}.json`).then((res) => res.json());
};
