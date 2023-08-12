import { useSelector } from "react-redux";
import { useState } from "react";

const DataShowcase = () => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortedBy, setSortedBy] = useState<"byTime" | "byValue" | "byGenerator">("byTime");
  const [currentPage, setCurrentPage] = useState(1);

  const allGeneratedValues: Record<number, { value: number; timestamp: number }[]> =
  useSelector((state: any) => {
    const allData: Record<number, { value: number; timestamp: number }[]> = {};
    Object.keys(state.generatedValues).forEach((genName: string) => {
      allData[genName] = state.generatedValues[genName].generatedValuesData || [];
    });
    return allData;
  });
  
  const totalData = Object.values(allGeneratedValues).reduce(
    (total, data) => total + data.length,
    0
    );
  const dataPerPage = 20;
  const totalPages = Math.ceil(totalData / dataPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  const handleSort = (sort: "byTime" | "byValue" | "byGenerator") => {
    setSortedBy(sort);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  const combinedData = Object.entries(allGeneratedValues)
    .flatMap(([genName, data]) =>
      data.map((entry) => ({
        genName: Number(genName),
        ...entry,
      }))
    )
  .sort((a, b) => {
    if (sortedBy === "byTime") {
      return sortOrder === "asc"
        ? a.timestamp - b.timestamp
        : b.timestamp - a.timestamp;
    } else if (sortedBy === "byValue") {
      return sortOrder === "asc" ? a.value - b.value : b.value - a.value;
    } else if (sortedBy === "byGenerator") {
      return sortOrder === "asc" ? a.genName - b.genName : b.genName - a.genName;
    }
    return 0;
  });

  return (
    <section>
      <div className="table__wrapper">
        <div className="pagination">
          <button
            className="button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>
                <button className="button--link" onClick={() => handleSort("byTime")}>
                  Timestamp{" "}
                  {sortedBy === "byTime"
                    ? sortOrder === "asc"
                      ? "▲"
                      : "▼"
                    : "▼"}
                </button>
              </th>
              <th>                <button className="button--link" onClick={() => handleSort("byGenerator")}>
                  Generator{" "}
                  {sortedBy === "byGenerator"
                    ? sortOrder === "asc"
                      ? "▲"
                      : "▼"
                    : "▼"}
                </button></th>
              <th>
                <button className="button--link" onClick={() => handleSort("byValue")}>
                  Value{" "}
                  {sortedBy === "byValue"
                    ? sortOrder === "asc"
                      ? "▲"
                      : "▼"
                    : "▼"}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {combinedData
              .slice((currentPage - 1) * dataPerPage, currentPage * dataPerPage)
              .map((entry, index) => (
                <tr key={index}>
                  <td>{new Date(entry.timestamp).toLocaleString()}</td>
                  <td>{entry.genName}</td>
                  <td>{entry.value.toFixed(2)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
export default DataShowcase;
