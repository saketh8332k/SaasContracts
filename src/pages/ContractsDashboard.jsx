// src/pages/ContractsDashboard.jsx
import React, { useState, useEffect} from "react";
import { fetchContracts } from "../utils/api";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import UploadModal from "../components/UploadModal";

const ContractsDashboard = () => {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [riskFilter, setRiskFilter] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const [showUpload, setShowUpload] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetchContracts()
      .then((data) => setContracts(data))
      .catch(() => alert("Error loading contracts"))
      .finally(() => setLoading(false));
  }, []);

  const filteredContracts = contracts.filter((contract) => {
    const matchesSearch =
      contract.name.toLowerCase().includes(search.toLowerCase()) ||
      contract.parties.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter ? contract.status === statusFilter : true;
    const matchesRisk = riskFilter ? contract.risk === riskFilter : true;
    return matchesSearch && matchesStatus && matchesRisk;
  });

  const totalPages = Math.ceil(filteredContracts.length / itemsPerPage);
  const paginatedContracts = filteredContracts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />

        <div className="p-6 overflow-auto flex-1">
          <div className="mb-6 text-sm bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-800 p-3 rounded-full animate-pulse font-semibold">
            <p>Manage and review your SaaS agreements with ease.</p>
          </div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-700">SaaS Contracts Dashboard</h1>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowUpload(true)}
                className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors duration-200">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v8m0-8l-4 4m4-4l4 4M12 3v9" />
                </svg>
                Upload Files
              </button>
            </div>
          </div>
          


          {/* Filters with Icons */}
          <div className="flex flex-wrap gap-4 mb-6">
            {/* Search Input */}
            <div className="flex items-center border p-2 rounded bg-white shadow-sm hover:shadow-md transition-shadow duration-200 min-w-[200px]">
              <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input
                type="text"
                placeholder="Search by name or parties"
                className="outline-none w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center border p-2 rounded bg-white shadow-sm hover:shadow-md transition-shadow duration-200 min-w-[150px]">
              <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v2h6v-2m-3-6v6m3-12h3m-12 0h3m-3 4h6" />
              </svg>
              <select
                className="outline-none bg-transparent"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Expired">Expired</option>
                <option value="Renewal Due">Renewal Due</option>
              </select>
            </div>

            {/* Risk Filter */}
            <div className="flex items-center border p-2 rounded bg-white shadow-sm hover:shadow-md transition-shadow duration-200 min-w-[150px]">
              <svg className="w-5 h-5 text-yellow-500 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01" />
              </svg>
              <select
                className="outline-none bg-transparent"
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
              >
                <option value="">All Risks</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          {/* Contracts Table */}
          {loading ? (
            <div className="text-center p-4">Loading...</div>
          ) : filteredContracts.length === 0 ? (
            <div className="text-center p-4 text-gray-500">No contracts found.</div>
          ) : (
            <div className="overflow-x-auto bg-white rounded shadow-sm border border-gray-200">
              <table className="table-auto w-full border-collapse text-gray-700">
                <thead className="bg-indigo-100 text-indigo-700">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">Name</th>
                    <th className="border border-gray-300 px-4 py-2">Parties</th>
                    <th className="border border-gray-300 px-4 py-2">Expiry</th>
                    <th className="border border-gray-300 px-4 py-2">Status</th>
                    <th className="border border-gray-300 px-4 py-2">Risk</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedContracts.map((contract) => (
                    <tr
                      key={contract.id}
                      className="hover:bg-indigo-50 cursor-pointer transition-colors duration-200"
                      onClick={() => navigate(`/contracts/${contract.id}`)}
                    >
                      <td className="border border-gray-300 px-4 py-2">{contract.name}</td>
                      <td className="border border-gray-300 px-4 py-2">{contract.parties}</td>
                      <td className="border border-gray-300 px-4 py-2">{contract.expiry}</td>
                      <td className="border border-gray-300 px-4 py-2">{contract.status}</td>
                      <td className="border border-gray-300 px-4 py-2">{contract.risk}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="flex justify-between items-center mt-4">
                <button
                  className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 disabled:opacity-50"
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                >
                  Previous
                </button>
                <span>Page {page} of {totalPages}</span>
                <button
                  className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 disabled:opacity-50"
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Upload Modal */}
          {showUpload && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                <UploadModal />
                <button
                  onClick={() => setShowUpload(false)}
                  className="mt-4 w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition-colors duration-200">
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContractsDashboard;
