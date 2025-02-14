import React, { useRef, useState } from "react";
import { AiOutlineFile } from "react-icons/ai";
import html2canvas from "html2canvas";
import axios from "../../api/axios";

const OrderDetail = ({ order }) => {


  console.log(order)
  
  const [productStatus, setProductStatus] = useState({});
  const [productQuantity, setProductQuantity] = useState({});
  const invoiceRef = useRef(null);

  const handleStatusChange = async (orderId, productId, value) => {
    setProductStatus((prev) => ({
      ...prev,
      [productId]: value,
    }));

    if (value !== "WRONG_ORDER" && value !== "FAULTY_PRODUCT") {
      setProductQuantity((prev) => {
        const updated = { ...prev };
        delete updated[productId];
        return updated;
      });
    }

    try {
      // Call the API to update the order status
      await updateOrderStatus(orderId, productId, value);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleQuantityChange = (productId, value) => {
    setProductQuantity((prev) => ({
      ...prev,
      [productId]: value,
    }));
  };

  const updateOrderStatus = async (orderId, productId, status) => {
    console.log(orderId)
    try {
      const response = await axios.patch(`/orders/${orderId}`, {
        orderId,
        productId,
        status,
      });
      if (response.data.success) {
        console.log("Order status updated successfully!");
      } else {
        console.log("Failed to update order status");
      }
    } catch (error) {
      console.error("Error while updating status:", error);
    }
  };
  const statusStyles = {
    default: "bg-gray-100 text-gray-800 border-gray-300",
    CANCELED: "bg-red-100 text-red-800 border-red-300",
    WRONG_ORDER: "bg-yellow-100 text-yellow-800 border-yellow-300",
    FAULTY_PRODUCT: "bg-orange-100 text-orange-800 border-orange-300",
  };

  const saveAsImage = () => {
    html2canvas(invoiceRef.current).then((canvas) => {
      const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      const link = document.createElement("a");
      link.download = "invoice.png";
      link.href = image;
      link.click();
    });
  };

  return (
    <>
      <div ref={invoiceRef} className="flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-3xl bg-gradient-to-b from-blue-50 to-white">
          <div className="flex justify-between p-6 bg-blue-100 rounded-t-lg">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white rounded-lg">
                <AiOutlineFile className="w-6 h-6 text-blue-600" />
              </div>
              <h1 className="text-xl font-semibold">Invoice</h1>
            </div>
            <p className="px-3 mt-3 text-white bg-green-700 rounded-md">Completed</p>
          </div>

          <div className="grid grid-cols-2 gap-6 p-6">
            <div>
              <p>Name - {order.shopName}</p>
              <p>Address - {order.shopAddress}</p>
              <p>Contact - {order.contact}</p>
            </div>
            <div className="text-right">
              <p><span className="font-medium">Invoice #:</span> {order.invoiceNo}</p>
              <p><span className="font-medium">Created at:</span> {order.createdDate}</p>
            </div>
          </div>

          <div className="px-6">
            <table className="w-full overflow-hidden border rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Qty</th>
                  <th className="p-3 text-left">Price</th>
                  <th className="p-3 text-left">Cash Back</th>
                  <th className="p-3 text-left">SubTotal</th>
                  <th className="p-3 text-left">Manage Order</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {order.products.map((product) => (
                  <tr key={product.product_id}>
                    <td className="p-3">{product.productName}</td>
                    <td className="p-3">{product.qty}</td>
                    <td className="p-3">{product.unitPrice}</td>
                    <td className="p-3">100</td>
                    <td className="p-3">{product.subTotal}</td>
                    <td className="p-3">
                      <div className="flex flex-col gap-2">
                        <select
                          onChange={(e) => handleStatusChange(order.orderId, product.productOrderid, e.target.value)}
                          className={`w-[120px] h-[30px] py-1 rounded ${
                            productStatus[product.productOrderid] ? statusStyles[productStatus[product.productOrderid]] : statusStyles.default
                          }`}
                        >
                          <option value="">No Report Yet</option>
                          <option value="CANCELED">Cancelled</option>
                          <option value="WRONG_ORDER">Wrong Order</option>
                          <option value="FAULTY_PRODUCT">Faulty</option>
                        </select>

                        {productStatus[product.productOrderid] === "WRONG_ORDER" || productStatus[product.productOrderid] === "FAULTY_PRODUCT" ? (
                          <input
                            type="number"
                            placeholder="Enter Quantity"
                            value={productQuantity[product.productOrderid] || 1}
                            onChange={(e) => handleQuantityChange(product.productOrderid, Number(e.target.value))}
                            min={1}
                            max={product.quantity}
                            className="p-2 border rounded w-[120px] h-[30px]"
                          />
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 text-right">
            <div className="flex items-center gap-5 px-4 py-2 ml-auto rounded-lg">
              <p className="mb-1 text-lg font-medium">TOTAL</p>
              <p className="text-3xl font-bold">{order.products.reduce((sum, product) => sum + product.subTotal, 0)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 mb-3 text-center">
        <button onClick={saveAsImage} className="px-4 py-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-700">
          Save as Image
        </button>
      </div>
    </>
  );
};

export default OrderDetail;
