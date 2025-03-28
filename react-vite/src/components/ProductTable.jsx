import { useState, useEffect } from "react";
import axios from "axios";
import { Select } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [columns, setColumns] = useState({
    id: true,
    title: true,
    description: true,
    price: true,
    brand: true,
    rating: true,
    thumbnail: true,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  // Fetch data with pagination
  const fetchProducts = (page) => {
    setLoading(true);
    axios
      .get(
        `https://dummyjson.com/products?limit=${productsPerPage}&skip=${
          (page - 1) * productsPerPage
        }`
      )
      .then((response) => {
        setProducts(response.data.products);
        setTotalProducts(response.data.total);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const handleColumnChange = (selectedColumns) => {
    const updatedColumns = Object.keys(columns).reduce((acc, column) => {
      acc[column] = selectedColumns.includes(column);
      return acc;
    }, {});
    setColumns(updatedColumns);
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
    }
    return 0;
  });

  // Pagination logic
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="w-full border body p-8">
      <h1 className="mb-6 font-bold">
        Thực hành xử lý bảng + dữ liệu (dynamic table)
      </h1>

      <div className="flex justify-end items-center">
        {/* Column Toggle */}
        <Select
          placeholder="Column"
          allowClear
          style={{
            width: 100,
          }}
       
          value={Object.keys(columns).filter((column) => !columns[column])} 
          onChange={handleColumnChange}
          options={Object.keys(columns).map((column) => ({
            value: column,
            label: column.toUpperCase(),
          }))}
        />

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <button
            className="p-2 bg-gray-200 rounded"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <LeftOutlined />
          </button>
          <ul className="flex items-center space-x-2">
            {[...Array(totalPages).keys()].map((number) => (
              <li
                key={number + 1}
                onClick={() => paginate(number + 1)}
                className={`p-2 cursor-pointer ${
                  currentPage === number + 1 ? "bg-blue-500 text-white" : ""
                }`}
              >
                {number + 1}
              </li>
            ))}
          </ul>
          <button
            className="p-2 bg-gray-200 rounded"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <RightOutlined />
          </button>
        </div>
      </div>

      {/* Product Table */}
      <table className="w-full mx-auto mt-4 table-auto border-collapse">
        <thead>
          <tr className="border">
            {columns.id && (
              <th
                className="text-lg font-semibold p-4 text-left uppercase cursor-pointer"
                onClick={() => handleSort("id")}
              >
                ID
              </th>
            )}
            {columns.title && (
              <th
                className="text-lg font-semibold p-4 text-left uppercase cursor-pointer"
                onClick={() => handleSort("title")}
              >
                Title
              </th>
            )}
            {columns.description && (
              <th
                className="text-lg font-semibold p-4 text-left uppercase cursor-pointer"
                onClick={() => handleSort("description")}
              >
                Description
              </th>
            )}
            {columns.price && (
              <th
                className="text-lg font-semibold p-4 text-left uppercase cursor-pointer"
                onClick={() => handleSort("price")}
              >
                Price
              </th>
            )}
            {columns.brand && (
              <th
                className="text-lg font-semibold p-4 text-left uppercase cursor-pointer"
                onClick={() => handleSort("brand")}
              >
                Brand
              </th>
            )}
            {columns.rating && (
              <th
                className="text-lg font-semibold p-4 text-left uppercase cursor-pointer"
                onClick={() => handleSort("rating")}
              >
                Rating
              </th>
            )}
            {columns.thumbnail && <th className="p-4 text-left">Thumbnail</th>}
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((product) => (
            <tr
              key={product.id}
              className="border"
              style={{
                backgroundColor:
                  product.id % 2 === 0 ? "transparent" : "#f2f2f2",
              }}
            >
              {columns.id && <td className="p-4">{product.id}</td>}
              {columns.title && <td className="p-4">{product.title}</td>}
              {columns.description && (
                <td className="p-4 max-w-xs">
                  <p className="line-clamp-3">{product.description}</p>
                </td>
              )}
              {columns.price && <td className="p-4">${product.price}</td>}
              {columns.brand && <td className="p-4">{product.brand}</td>}
              {columns.rating && <td className="p-4">{product.rating}</td>}
              {columns.thumbnail && (
                <td className="p-4">
                  <img src={product.thumbnail} alt={product.title} width="50" />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
