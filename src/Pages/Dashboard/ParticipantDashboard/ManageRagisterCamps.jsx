import { useState, useMemo } from "react";
import { Link, useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";

const ManageRegisteredCamps = () => {
  const camps = useLoaderData();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [localCamps, setLocalCamps] = useState(camps);

  const filteredLocalCamps = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return localCamps.filter((camp) =>
      camp.campName?.toLowerCase().includes(term) ||
      camp.location?.toLowerCase().includes(term) ||
      camp.participantName?.toLowerCase().includes(term) ||
      String(camp.fees).includes(term)
    );
  }, [localCamps, searchTerm]);

  const totalPages = Math.ceil(filteredLocalCamps.length / rowsPerPage);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentCamps = filteredLocalCamps.slice(indexOfFirst, indexOfLast);

  const handleCancel = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`https://medical-camp-server-liart.vercel.app/registrations/${id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (data.deletedCount > 0) {
          Swal.fire("Cancelled!", "Your registration has been cancelled.", "success");
          const updated = localCamps.filter((camp) => camp._id !== id);
          setLocalCamps(updated);
          if ((currentPage - 1) * rowsPerPage >= updated.length && currentPage > 1) {
            setCurrentPage(currentPage - 1);
          }
        }
      } catch (error) {
        console.error("Cancel error:", error);
      }
    }
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const onSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4 text-center">My Registered Camps</h2>

      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search by Camp Name, Location, Participant or Fees"
          className="input input-bordered w-full max-w-md"
          value={searchTerm}
          onChange={onSearchChange}
        />
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        {localCamps.length === 0 ? (
          <p className="text-center text-gray-500 py-10">
            You haven't registered for any camps yet.
          </p>
        ) : currentCamps.length === 0 ? (
          <p className="text-center text-gray-500 py-10">No camps match your search.</p>
        ) : (
          <>
            <table className="table w-full">
              <thead className="bg-indigo-100">
                <tr>
                  <th>#</th>
                  <th>Camp Name</th>
                  <th>Fees (BDT)</th>
                  <th>Location</th>
                  <th>Participant</th>
                  <th>Payment</th>
                  <th>Confirmation</th>
                  <th>Cancel</th>
                  <th>Feedback</th>
                </tr>
              </thead>
              <tbody>
                {currentCamps.map((camp, index) => (
                  <tr key={camp._id} className="border-t">
                    <td>{indexOfFirst + index + 1}</td>
                    <td>{camp.campName}</td>
                    <td>{camp.fees}</td>
                    <td>{camp.location}</td>
                    <td>{camp.participantName}</td>
                    <td>
                      {camp.paymentStatus === "paid" ? (
                        <span className="text-green-600">
                          Paid <br /> <small>(Txn: {camp.transactionId})</small>
                        </span>
                      ) : (
                        <Link to={`/dashboard/payment/${camp._id}`}>
                          <button className="btn btn-sm btn-primary">Pay Now</button>
                        </Link>
                      )}
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          camp.confirmationStatus === "Confirmed"
                            ? "badge-success"
                            : "badge-warning"
                        }`}
                      >
                        {camp.confirmationStatus || "Pending"}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => handleCancel(camp._id)}
                        disabled={camp.paymentStatus === "paid"}
                      >
                        Cancel
                      </button>
                    </td>
                    <td>
                      {camp.paymentStatus === "paid" && !camp.feedbackGiven ? (
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => navigate(`/dashboard/feedback/${camp._id}`)}
                        >
                          Give Feedback
                        </button>
                      ) : camp.feedbackGiven ? (
                        <span className="text-green-500">Submitted</span>
                      ) : (
                        <span className="text-gray-400">Not Available</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-center mt-6 space-x-2">
              {pageNumbers.map((number) => (
                <button
                  key={number}
                  onClick={() => setCurrentPage(number)}
                  className={`px-4 py-2 rounded-md border ${
                    number === currentPage
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-indigo-600 hover:bg-indigo-200"
                  }`}
                >
                  {number}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ManageRegisteredCamps;
