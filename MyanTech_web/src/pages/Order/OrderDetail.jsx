import React from 'react'
import { AiOutlineFile } from 'react-icons/ai'

const OrderDetail = ({order}) => {
  return (
    <div className="flex items-center justify-center bg-gray-100">
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
           
            <p>Name - </p>
            <p>Address - 236 Main Street</p>
           
            <p>Contact - +1-212-545-4325</p>
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
                </tr>
              </thead>
              <tbody className="divide-y">

                {
                    order.products.map((product)=> <tr>
                    <td className="p-3">
                      {product.product_name}
                    </td>
                    <td className="p-3">{product.quantity}</td>
                    <td className="p-3">{product.unit_price}</td>
                    <td className="p-3">100</td>
                    <td className="p-3 text-left">{product.subtotal}</td>
                  </tr> )
                }
               
                
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="p-4 rounded-lg bg-gray-50">
              <p className="mb-2 font-medium">NOTE:</p>
              <p className="text-sm text-gray-600"></p>
              <p className="text-sm text-gray-600">Late payments may incur a 5% late fee.</p>
              <p className="text-sm text-gray-600">Please reference Invoice No. 12345 when making the payment.</p>
            </div>
            <div className="text-right">
              <div className="inline-block p-4 rounded-lg bg-blue-50">
                <p className="mb-1 text-lg font-medium">TOTAL</p>
                <p className="text-3xl font-bold text-blue-600">
                     {order.products.reduce((sum, product) => sum + product.subtotal, 0)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetail
