import React, { useRef, useState } from 'react'
import { AiOutlineFile } from 'react-icons/ai'
import html2canvas from "html2canvas"


const OrderDetail = ({ order }) => {
  console.log(order);
  
  const [status, setStatus] = useState(null)
  const [quantity, setQuantity] = useState(1)

  const statusStyles = {
    default: "bg-gray-100 text-gray-800 border-gray-300",
    CANCELED: "bg-red-100 text-red-800 border-red-300",
    WRONG_ORDER: "bg-yellow-100 text-yellow-800 border-yellow-300",
    FAULTY_PRODUCT: "bg-orange-100 text-orange-800 border-orange-300",
  }
  const invoiceRef = useRef(null)

  const saveAsImage = () => {
    html2canvas(invoiceRef.current).then((canvas) => {
      const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")
      const link = document.createElement("a")
      link.download = "invoice.png"
      link.href = image
      link.click()
    })
  }
  return (
    <>
      <div ref={invoiceRef} className="flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-3xl bg-gradient-to-b from-blue-50 to-white">
          {/* Header Section */}
          <div className="p-6 bg-blue-100 rounded-t-lg">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white rounded-lg">
                  <AiOutlineFile className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold">Invoice</h1>
                </div>
              </div>
              <div className="text-right">
                <p className='px-3 mt-3 text-white bg-green-700 rounded-md order-gray-400 bg-green'>Completed</p>
              </div>
            </div>
          </div>

          {/* Billing Information */}
          <div className="grid grid-cols-2 gap-6 p-6">
            <div>

              <p>Name - {order.shop_name}</p>
              <p>Address - {order.shop_address}</p>

              <p>Contact - {order.contact} </p>
            </div>
            <div className="text-right">
              <div className="space-y-1">
                <p>
                  <span className="font-medium">Invoice #:</span> {order.invoice_no}
                </p>
                <p>
                  <span className="font-medium">Created at:</span> 09/11/24
                </p>
                {/* <p>
                <span className="font-medium">Invoice Due Date:</span> 09/20/24
              </p> */}
              </div>
            </div>
          </div>

          {/* Invoice Items */}
          <div className="px-6">
            <div className="overflow-hidden border rounded-lg">
              <table className="w-full">
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

                  {
                    order.products.map((product) => <tr key={product.id}>
                      <td className="p-3">
                        {product.product_name}
                      </td>
                      <td className="p-3">{product.quantity}</td>
                      <td className="p-3">{product.unit_price}</td>
                      <td className="p-3">100</td>
                      <td className="p-3 text-left">{product.subtotal}</td>
                      <td className="p-3 text-left">
                        <div className="flex flex-col gap-2">
                          {/* Dropdown for Order Management */}
                          <select
                            onChange={(e) => setStatus(e.target.value)}
                            className={`w-[120px] h-[30px] py-1 rounded ${status ? statusStyles[status] : statusStyles.default}`}
                          >
                            <option value="" >No Report Yet</option>
                            <option value="cancelled" className={statusStyles.cancelled}>Cancelled</option>
                            <option value="wrong_order" className={statusStyles.wrong_order}>Wrong Order</option>
                            <option value="faulty" className={statusStyles.faulty}>Faulty</option>
                          </select>

                          {/* Conditional Input for Quantity */}
                          {(status === "wrong_order" || status === "faulty") && (
                            <div className="flex flex-col gap-1">
                              <input
                                
                                type="number"
                                placeholder="Enter Quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                min={1}
                                max={product.quantity}
                                className=" p-2 border rounded w-[120px] h-[30px] py-1"
                              />
                            </div>
                          )}
                        </div>
                      </td>

                    </tr>)
                  }


                </tbody>
              </table>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6">
            <div className="grid grid-cols-2 gap-6">
              <div className=""></div>
              <div className="text-right">
                <div className="flex items-center gap-5 px-4 py-2 ml-auto mr-0 rounded-lg ">
                  <p className="mb-1 text-lg font-medium">TOTAL</p>
                  <p className="text-3xl font-bold !text-gradient">
                    {order.products.reduce((sum, product) => sum + product.subtotal, 0)}</p>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>

      <div className="mt-5 mb-3 text-center ">
        <button onClick={saveAsImage} className="px-4 py-2 font-bold text-white rounded bg-button hover:bg-blue-700">
          Save as Image
        </button>
      </div>
    </>
  )
}

export default OrderDetail
