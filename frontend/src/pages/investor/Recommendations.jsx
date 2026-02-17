import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InvestorNavbar from "../../components/InvestorNavbar";
import { getRecommendationsByRequest } from "../../api/api";

export default function Recommendations() {
  const { requestId } = useParams();
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    getRecommendationsByRequest(requestId).then(res => setRecommendations(res.data)).catch(err => console.error(err));
  }, [requestId]);

  return (
    <>
      <InvestorNavbar />
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6">Recommendations for Request #{requestId}</h2>
        {recommendations.length === 0 ? (
          <p className="text-gray-600">No recommendations yet. Your advisor will provide recommendations soon.</p>
        ) : (
          <div className="grid gap-4">
            {recommendations.map(rec => (
              <div key={rec.recommendationId} className="border rounded p-4 bg-white shadow">
                <h3 className="text-xl font-bold mb-2">{rec.company.name}</h3>
                <p className="text-gray-600 mb-2"><strong>Sector:</strong> {rec.company.sector?.sectorName}</p>
                <p className="text-gray-600 mb-2"><strong>Risk Level:</strong> {rec.company.riskLevel}</p>
                <p className="text-gray-600 mb-2"><strong>Expected Return:</strong> {rec.expectedReturn}</p>
                <p className="text-gray-700 mb-2"><strong>Notes:</strong> {rec.notes}</p>
                {rec.reportUrl && (
                  <a href={rec.reportUrl} target="_blank" className="text-blue-600 underline block mt-2">📄 Download Financial Report (PDF)</a>
                )}
                <p className="text-sm text-gray-500 mt-2">By: {rec.advisor.fullName}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
