import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../redux/reduxActions";
import { useState } from "react";
const DataShowcase = () => {
  const dispatch = useDispatch();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortedBy, setSortedBy] = useState<"byTime" | "byValue">("byTime");
  const generatedValuesData: { value: number; timestamp: number }[] =
    useSelector((state: any) => state.generatedValues.generatedValuesData);
  const currentPage: number = useSelector(
    (state: any) => state.generatedValues.currentPage
  );
  const dataPerPage = 20;
  const totalData = generatedValuesData.length;
  const totalPages = Math.ceil(totalData / dataPerPage);
  const startIndex = (currentPage - 1) * dataPerPage;
  const endIndex = startIndex + dataPerPage;

  const handlePageChange = (newPage: number) => {
    dispatch(setCurrentPage(newPage));
  };
  const handleSort = (sort: "byTime" | "byValue") => {
    setSortedBy(sort);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const sortedData = generatedValuesData.slice().sort((a, b) => {
    if (sortedBy === "byTime") {
      return sortOrder === "asc"
        ? a.timestamp - b.timestamp
        : b.timestamp - a.timestamp;
    } else if (sortedBy === "byValue") {
      return sortOrder === "asc" ? a.value - b.value : b.value - a.value;
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
              <th>Content</th>
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
            {sortedData.slice(startIndex, endIndex).map((entry, index) => (
              <tr key={index}>
                <td>{new Date(entry.timestamp).toLocaleString()}</td>
                <td>Power Consumption</td>
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
