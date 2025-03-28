import { useEffect, useState } from "react";
import { Table, Button, Space, Pagination, Dropdown, Checkbox, Modal, Form, Input, InputNumber } from "antd";
import qs from "qs";

const getApiParams = (params) => ({
  limit: params.pagination?.pageSize,
  skip: (params.pagination?.current - 1) * params.pagination?.pageSize,
});

const TableTest = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const [visibleColumns, setVisibleColumns] = useState([
    "id", "title", "description", "price", "brand", "rating", "thumbnail", "actions"
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form] = Form.useForm();

  const fetchData = () => {
    setLoading(true);
    const params = getApiParams(tableParams);
    fetch(`https://dummyjson.com/products?${qs.stringify(params)}`)
      .then((res) => res.json())
      .then(({ products, total }) => {
        setData(products);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total,
          },
        });
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [tableParams.pagination?.current, tableParams.pagination?.pageSize]);

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      sortField: sorter.field,
      sortOrder: sorter.order,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  const handlePaginationChange = (page, pageSize) => {
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        current: page,
        pageSize,
      },
    });
  };

  const handleColumnChange = (column) => {
    setVisibleColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column]
    );
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    form.setFieldsValue(product);
    setIsModalOpen(true);
  };

  const confirmDelete = (id) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa sản phẩm này không?",
      okText: "Xóa",
      cancelText: "Hủy",
      onOk: () => handleDelete(id),
    });
  };

  const handleDelete = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const handleSave = () => {
    form.validateFields()
      .then((values) => {
        if (editingProduct) {
          setData((prevData) =>
            prevData.map((item) => (item.id === editingProduct.id ? { ...item, ...values } : item))
          );
        } else {
          const newProduct = { id: Date.now(), ...values };
          setData((prevData) => [newProduct, ...prevData]);
        }
        setIsModalOpen(false);
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };

  const columnsConfig = [
    { title: "ID", dataIndex: "id", sorter: true, width: "10%" },
    { title: "Title", dataIndex: "title", sorter: true, width: "20%" },
    { title: "Description", dataIndex: "description", width: "30%" },
    { title: "Price", dataIndex: "price", sorter: true, width: "10%" },
    { title: "Brand", dataIndex: "brand", width: "10%" },
    { title: "Rating", dataIndex: "rating", sorter: true, width: "10%" },
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      render: (thumbnail) => <img src={thumbnail} alt="Thumbnail" width={50} />,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, record) => (
        <Space>
          <Button onClick={() => handleEdit(record)}>Sửa</Button>
          <Button danger onClick={() => confirmDelete(record.id)}>Xóa</Button>
        </Space>
      ),
    },
  ];

  const filteredColumns = columnsConfig.filter((col) =>
    visibleColumns.includes(col.dataIndex) || col.dataIndex === "actions"
  );

  const dropdownMenu = (
    <div style={{ padding: "8px", width: "150px", maxHeight: "300px", overflowY: "auto", border: "1px solid", backgroundColor: "#fff", zIndex: "1000" }}>
      {columnsConfig.map((col) => (
        <div key={col.dataIndex} style={{ marginBottom: "4px" }}>
          <Checkbox
            checked={visibleColumns.includes(col.dataIndex)}
            onChange={() => handleColumnChange(col.dataIndex)}
          >
            {col.title}
          </Checkbox>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <h1 className="mb-6 font-bold">Thực hành xử lý bảng + dữ liệu (dynamic table)</h1>

      <div className="flex justify-between items-center mb-4">
        <Button type="primary" onClick={() => setIsModalOpen(true)}>Thêm sản phẩm</Button>

        <div className="flex items-center">
          <Dropdown className="mr-10" overlay={dropdownMenu} trigger={["click"]}>
            <Button>Chọn Cột</Button>
          </Dropdown>

         
        </div>
      </div>

      <Table
        columns={filteredColumns}
        rowKey={(record) => record.id}
        dataSource={data}
        pagination={false}
        loading={loading}
        onChange={handleTableChange}
      />
 <Pagination
            current={tableParams.pagination.current}
            pageSize={tableParams.pagination.pageSize}
            total={tableParams.pagination.total}
            onChange={handlePaginationChange}
            showSizeChanger
          />
      <Modal
        title={editingProduct ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm"}
        open={isModalOpen}
        onOk={handleSave}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="Tên sản phẩm" rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Mô tả">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="price" label="Giá" rules={[{ required: true, message: "Vui lòng nhập giá" }]}>
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="brand" label="Thương hiệu">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
    
  );
};

export default TableTest;
