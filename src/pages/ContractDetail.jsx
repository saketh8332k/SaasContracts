// src/pages/ContractDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchContractDetail } from "../utils/api";

const ContractDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchContractDetail(id)
      .then((data) => setContract(data))
      .catch(() => alert("Failed to load contract"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="p-6">Loading contract details...</div>;
  }

  if (!contract) {
    return <div className="p-6 text-red-500">Contract not found.</div>;
  }

  return (
    <div className="p-6 bg-white rounded shadow-sm max-w-3xl mx-auto mt-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-indigo-600 hover:underline"
      >
        &larr; Back to Dashboard
      </button>

      <h1 className="text-2xl font-bold mb-4">{contract.name}</h1>

      <div className="mb-4">
        <h2 className="font-semibold text-gray-700">Parties:</h2>
        <p>{contract.parties}</p>
      </div>

      <div className="mb-4">
        <h2 className="font-semibold text-gray-700">Expiry:</h2>
        <p>{contract.expiry}</p>
      </div>

      <div className="mb-4">
        <h2 className="font-semibold text-gray-700">Status:</h2>
        <p>{contract.status}</p>
      </div>

      <div className="mb-4">
        <h2 className="font-semibold text-gray-700">Risk:</h2>
        <p>{contract.risk}</p>
      </div>

      <div className="mb-4">
        <h2 className="font-semibold text-gray-700">Clauses:</h2>
        <ul className="list-disc list-inside">
          <li>Clause 1: Lorem ipsum dolor sit amet.</li>
          <li>Clause 2: Consectetur adipiscing elit.</li>
          <li>Clause 3: Integer molestie lorem at massa.</li>
        </ul>
      </div>

      <div className="mb-4">
        <h2 className="font-semibold text-gray-700">AI Insights:</h2>
        <p>Suggested review: Pay attention to renewal terms and penalties.</p>
      </div>

      <div className="mb-4">
        <h2 className="font-semibold text-gray-700">Evidence:</h2>
        <p>No attached files.</p>
      </div>
    </div>
  );
};

export default ContractDetail;
