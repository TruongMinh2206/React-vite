import { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";

// let idCounter = 1;
const generateMockData = (numRecords) => {
  const mockData = [];
  for (let i = 1; i <= numRecords; ++i) {
    mockData.push({
      id: i,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      age: faker.number.int({ min: 18, max: 70 }), // faker.number.int thay cho faker.datatype.number
      address: faker.address.streetAddress(),
      birthday: faker.date
        .past(50, new Date("2000-01-01"))
        .toLocaleDateString(),
      sex: faker.person.sex(),
      jobArea: faker.person.jobArea(),
      phone: faker.phone.number(),
      subscriptionTier: faker.helpers.arrayElement([
        "Free",
        "Pro",
        "Enterprise",
      ]),
      avatar: faker.image.avatar(),
      action: "Edit | Delete",
    });
  }
  return mockData;
};

const TableWithPagination = () => {
  const [selectedValue, setSelectedValue] = useState("10");

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  // Hàm thay đổi giá trị trong select
  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    setItemsPerPage(Number(value)); 
    setCurrentPage(1); 
  };

  useEffect(() => {
    const data = generateMockData(100); 
    setData(data);
  }, []);

  // Phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="border body p-8 w-full">
      <p className="mb-6 font-bold">Thực hành mockup data</p>
      <div className="ant-table-wrapper css-k7429z">
        <div className="ant-spin-nested-loading css-k7429z">
          <div className="ant-spin-container">
            <div className="ant-table">
              <div className="ant-table-container">
                <div className="ant-table-content">
                  <table className="w-[100%]">
                    <thead className="ant-table-thead">
                      <tr>
                        <th className="ant-table-cell ant-table-column-sort ant-table-column-has-sorters">
                          ID
                        </th>
                        <th className="ant-table-cell">First Name</th>
                        <th className="ant-table-cell">Last Name</th>
                        <th className="ant-table-cell ant-table-column-has-sorters">
                          Age
                        </th>
                        <th className="ant-table-cell">Address</th>
                        <th className="ant-table-cell">Birthday</th>
                        <th className="ant-table-cell ant-table-column-has-sorters">
                          Sex
                        </th>
                        <th className="ant-table-cell">Job Area</th>
                        <th className="ant-table-cell">Phone</th>
                        
                        <th className="ant-table-cell">Avatar</th>
                        <th className="ant-table-cell">Action</th>
                      </tr>
                    </thead>
                    <tbody className="ant-table-tbody">
                      {currentItems.map((item) => (
                        <tr
                          className="ant-table-row ant-table-row-level-0"
                          key={item.id}
                        >
                          <td className="ant-table-cell">{item.id}</td>
                          <td className="ant-table-cell">{item.firstName}</td>
                          <td className="ant-table-cell">{item.lastName}</td>
                          <td className="ant-table-cell">{item.age}</td>
                          <td className="ant-table-cell">{item.address}</td>
                          <td className="ant-table-cell">{item.birthday}</td>
                          <td className="ant-table-cell">{item.sex}</td>
                          <td className="ant-table-cell">{item.jobArea}</td>
                          <td className="ant-table-cell">{item.phone}</td>
                          
                          <td className="ant-table-cell">
                            <img
                              src={item.avatar}
                              alt="avatar"
                              width={40}
                              height={40}
                            />
                          </td>
                          <td className="ant-table-cell">{item.action}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Pagination */}
              <ul className="ant-pagination ant-table-pagination ant-table-pagination-right css-k7429z">
                {Array.from({
                  length: Math.ceil(data.length / itemsPerPage),
                }).map((_, index) => (
                  <li
                    className="ant-pagination-prev "
                    key={index}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </li>
                ))}
                <li>
                  <div className="flex items-center justify-center">
                    <select
                      id="page-size"
                      value={selectedValue}
                      onChange={handleChange}
                      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="10">10 / page</option>
                      <option value="20">20 / page</option>
                      <option value="50">50 / page</option>
                      <option value="100">100 / page</option>
                    </select>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableWithPagination;
