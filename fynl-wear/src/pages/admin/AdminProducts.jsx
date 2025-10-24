import { useProducts } from "../../hooks/useProducts";
import Table from "../../components/Table.jsx";

const AdminProducts = () => {
  const {
    products,
    totalPage,
    isLoading,
    sortValue,
    category,
    currentPage,
    handleSortBy,
    handleCategory,
    handleCurrentPage,
  } = useProducts();

  console.log(products);

  const productTableHeaders = [
    "Image",
    "Name",
    "Category",
    "Price",
    "Stock",
    "Actions",
  ];

  const tableData = products.map((product) => [
    product.image1,
    product.name,
    product.category,
    product.price,
    product.stock,
    "Edit | Delete",
  ]);

  return (
    <div className="p-4 lg:p-8 bg-purple-100 min-h-dvh">
      <Table headers={productTableHeaders} data={tableData} />
    </div>
  );
};

export default AdminProducts;
