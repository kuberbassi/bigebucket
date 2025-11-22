import React, { useState, useEffect } from 'react'
import { useGlobalContext } from '../provider/GlobalProvider'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import AddAddress from '../components/AddAddress'
import { useSelector } from 'react-redux'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi, { baseURL } from '../common/SummaryApi'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
// Stripe public key removed from frontend initialization. Server will provide a redirect URL.

const CheckoutPage = () => {
  const { notDiscountTotalPrice, totalPrice, totalQty, fetchCartItem,fetchOrder } = useGlobalContext()
  // Delivery / handling config (adjust as needed)
  const DELIVERY_FREE_THRESHOLD = 500 // rupees - orders above this get free delivery
  const DELIVERY_FEE = 30 // rupees for delivery when below threshold
  const HANDLING_PERCENT = 2 // percent of totalPrice as handling charge
  const [openAddress, setOpenAddress] = useState(false)
  const addressList = useSelector(state => state.addresses.addressList) || []
  const [selectAddress, setSelectAddress] = useState(addressList.length ? 0 : -1)

  // If addresses are loaded asynchronously, default to the first available address
  useEffect(() => {
    if (addressList && addressList.length && selectAddress === -1) {
      setSelectAddress(0)
    }
  }, [addressList])

  const [useDebug, setUseDebug] = useState(false)
  const cartItemsList = useSelector(state => state.cartItem.cart)
  const navigate = useNavigate()

  const handleCashOnDelivery = async() => {
      try {
          // compute additional charges
          const deliveryCharge = Number(totalPrice) >= DELIVERY_FREE_THRESHOLD ? 0 : DELIVERY_FEE
          const handlingCharge = Math.ceil((Number(totalPrice) * HANDLING_PERCENT) / 100)
          const finalTotal = Number(totalPrice) + Number(deliveryCharge) + Number(handlingCharge)
          const response = await Axios({
            ...SummaryApi.CashOnDeliveryOrder,
            data : {
              list_items : cartItemsList,
              addressId : addressList[selectAddress]?._id,
              subTotalAmt : totalPrice,
              totalAmt :  finalTotal,
              deliveryCharge,
              handlingCharge
            }
          })

          const { data : responseData } = response

          if(responseData.success){
              toast.success(responseData.message)
              if(fetchCartItem){
                fetchCartItem()
              }
              if(fetchOrder){
                fetchOrder()
              }
              navigate('/success',{
                state : {
                  text : "Order"
                }
              })
          }

      } catch (error) {
        AxiosToastError(error)
      }
  }

  const handleOnlinePayment = async()=>{
    try {
      // compute additional charges
      const deliveryCharge = Number(totalPrice) >= DELIVERY_FREE_THRESHOLD ? 0 : DELIVERY_FEE
      const handlingCharge = Math.ceil((Number(totalPrice) * HANDLING_PERCENT) / 100)
      const finalTotal = Number(totalPrice) + Number(deliveryCharge) + Number(handlingCharge)

      // Build a form and submit it to the server endpoint which returns an auto-submitting
      // HTML form that redirects to CCAvenue.
  const form = document.createElement('form')
  form.method = 'POST'
  // Ensure form posts to the backend (not the dev server origin). Use configured baseURL.
  // baseURL may be empty for same-origin setups; this works for both local and proxied setups.
  form.action = `${baseURL || ''}${SummaryApi.ccav_initiate.url}`
      form.style.display = 'none'

      const payload = {
        list_items: cartItemsList,
        addressId: addressList[selectAddress]?._id,
        subTotalAmt: totalPrice,
        totalAmt: finalTotal,
        deliveryCharge,
        handlingCharge
      }

      // CCAvenue expects certain fields for initiating a transaction. Add them here.
      const ccavData = {
        order_id: `ORD-${Date.now()}`,
        amount: String(finalTotal),
        currency: 'INR',
        billing_name: addressList[selectAddress]?.name || addressList[selectAddress]?.address_line || 'Customer',
        billing_email: addressList[selectAddress]?.email || '',
        billing_tel: addressList[selectAddress]?.mobile || '',
        // For local testing point to your backend response handler. Adjust host/port if needed.
        redirect_url: 'http://localhost:8080/api/ccav/response',
        cancel_url: 'http://localhost:8080/api/ccav/response'
      }

      // CCAvenue server expects urlencoded form body; convert payload to k=v pairs.
      const params = new URLSearchParams()
      // list_items is complex; send it as JSON string under 'list_items'
      params.append('list_items', JSON.stringify(payload.list_items || []))
      // append ccav-specific fields
      for (const [k, v] of Object.entries(ccavData)){
        params.append(k, v)
      }
      if (payload.addressId) params.append('addressId', payload.addressId)
      params.append('subTotalAmt', String(payload.subTotalAmt || 0))
      params.append('totalAmt', String(payload.totalAmt || 0))
      params.append('deliveryCharge', String(payload.deliveryCharge || 0))
      params.append('handlingCharge', String(payload.handlingCharge || 0))

      // add params as hidden inputs
      for (const [k, v] of params.entries()){
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = k
        input.value = v
        form.appendChild(input)
      }

      document.body.appendChild(form)
      form.submit()
      return
    } catch (error) {
      AxiosToastError(error)
    }
  }

  // Debug flow: call /api/ccav/debug which returns { encRequest, access_code }
  const handleOnlinePaymentDebug = async() => {
    try {
      const deliveryCharge = Number(totalPrice) >= DELIVERY_FREE_THRESHOLD ? 0 : DELIVERY_FEE
      const handlingCharge = Math.ceil((Number(totalPrice) * HANDLING_PERCENT) / 100)
      const finalTotal = Number(totalPrice) + Number(deliveryCharge) + Number(handlingCharge)

      const payload = {
        list_items: cartItemsList,
        addressId: addressList[selectAddress]?._id,
        subTotalAmt: totalPrice,
        totalAmt: finalTotal,
        deliveryCharge,
        handlingCharge
      }

      const params = new URLSearchParams()
      params.append('list_items', JSON.stringify(payload.list_items || []))
      if (payload.addressId) params.append('addressId', payload.addressId)
      params.append('subTotalAmt', String(payload.subTotalAmt || 0))
      params.append('totalAmt', String(payload.totalAmt || 0))
      params.append('deliveryCharge', String(payload.deliveryCharge || 0))
      params.append('handlingCharge', String(payload.handlingCharge || 0))

      // attach ccav fields
      params.append('order_id', `ORD-${Date.now()}`)
      params.append('amount', String(finalTotal))
      params.append('currency', 'INR')

      const resp = await fetch(`${baseURL || ''}${SummaryApi.ccav_debug.url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString()
      })

      const text = await resp.text()
      // if server returned HTML form, append & let it auto-submit
      if (text && text.includes('encRequest')){
        const wrapper = document.createElement('div')
        wrapper.innerHTML = text
        document.body.appendChild(wrapper)
        // find form and submit if present
        const frm = wrapper.querySelector('form')
        if (frm) frm.submit()
        return
      }

      // Try parsing JSON (debug endpoint returns JSON)
      let json
      try { json = JSON.parse(text) } catch (e) { json = null }
      if (!json || !json.encRequest || !json.access_code) {
        toast.error('Invalid response from CCAV debug endpoint')
        console.error('CCAV debug response', text)
        return
      }

      // Post directly to CCAvenue
      const ccavForm = document.createElement('form')
      ccavForm.method = 'POST'
      ccavForm.action = 'https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction'
      ccavForm.style.display = 'none'
      const i1 = document.createElement('input')
      i1.type = 'hidden'
      i1.name = 'encRequest'
      i1.value = json.encRequest
      const i2 = document.createElement('input')
      i2.type = 'hidden'
      i2.name = 'access_code'
      i2.value = json.access_code
      ccavForm.appendChild(i1)
      ccavForm.appendChild(i2)
      document.body.appendChild(ccavForm)
      ccavForm.submit()

    } catch (error) {
      AxiosToastError(error)
    }
  }

  // CCAvenue payment removed. Use server-side/Stripe or Cash on Delivery.

  return (
    <section className='bg-blue-50'>
      <div className='container mx-auto p-4 flex flex-col lg:flex-row w-full gap-5 justify-between'>
        <div className='w-full'>
          {/***address***/}
          <h3 className='text-lg font-semibold'>Choose your address</h3>
          <div className='bg-white p-2 grid gap-4'>
              {addressList.length ? (
                addressList.map((address, index) => {
                  if (!address.status) return null
                  return (
                    <label htmlFor={"address" + index} key={address._id || index}>
                      <div className='border rounded p-3 flex gap-3 hover:bg-blue-50'>
                        <div>
                          <input id={"address" + index} type='radio' value={index} checked={selectAddress === index} onChange={(e) => setSelectAddress(Number(e.target.value))} name='address' />
                        </div>
                        <div>
                          <p>{address.address_line}</p>
                          <p>{address.city}</p>
                          <p>{address.state}</p>
                          <p>{address.country} - {address.pincode}</p>
                          <p>{address.mobile}</p>
                        </div>
                      </div>
                    </label>
                  )
                })
              ) : (
                <div className='p-4 text-sm text-neutral-600'>No saved addresses. Please add one.</div>
              )}
            <div onClick={() => setOpenAddress(true)} className='h-16 bg-blue-50 border-2 border-dashed flex justify-center items-center cursor-pointer'>
              Add address
            </div>
          </div>



        </div>

        <div className='w-full max-w-md bg-white py-4 px-2'>
          {/**summary**/}
          <h3 className='text-lg font-semibold'>Summary</h3>
          <div className='bg-white p-4'>
            <h3 className='font-semibold'>Bill details</h3>
            <div className='flex gap-4 justify-between ml-1'>
              <p>Items total</p>
              <p className='flex items-center gap-2'><span className='line-through text-neutral-400'>{DisplayPriceInRupees(notDiscountTotalPrice)}</span><span>{DisplayPriceInRupees(totalPrice)}</span></p>
            </div>
            <div className='flex gap-4 justify-between ml-1'>
              <p>Quntity total</p>
              <p className='flex items-center gap-2'>{totalQty} item</p>
            </div>
            {/* Delivery & handling charges */}
            <div className='flex gap-4 justify-between ml-1'>
              <p>Delivery Charge</p>
              <p className='flex items-center gap-2'>
                {Number(totalPrice) >= DELIVERY_FREE_THRESHOLD ? (
                  <span>Free</span>
                ) : (
                  <span>{DisplayPriceInRupees(DELIVERY_FEE)}</span>
                )}
              </p>
            </div>
            <div className='flex gap-4 justify-between ml-1'>
              <p>Handling charge</p>
              <p className='flex items-center gap-2'>{DisplayPriceInRupees(Math.ceil((Number(totalPrice) * HANDLING_PERCENT) / 100))}</p>
            </div>
            <div className='font-semibold flex items-center justify-between gap-4'>
              <p >Grand total</p>
              <p>{DisplayPriceInRupees(Number(totalPrice) + (Number(totalPrice) >= DELIVERY_FREE_THRESHOLD ? 0 : DELIVERY_FEE) + Math.ceil((Number(totalPrice) * HANDLING_PERCENT) / 100))}</p>
            </div>
          </div>
          <div className='w-full flex flex-col gap-4'>
            {/** Online payment - server will create CCAV form. Use debug mode to POST encRequest directly. */}
            <div className='flex gap-2 items-center'>
              <input id='ccav-debug' type='checkbox' onChange={(e) => setUseDebug(Boolean(e.target.checked))} />
              <label htmlFor='ccav-debug' className='text-sm'>Debug mode (use /api/ccav/debug)</label>
            </div>
            <button
              className='py-2 px-4 bg-green-600 hover:bg-green-700 rounded text-white font-semibold disabled:opacity-50'
              onClick={() => useDebug ? handleOnlinePaymentDebug() : handleOnlinePayment()}
              disabled={cartItemsList?.length === 0 || selectAddress < 0}
            >
              Online Payment
            </button>

            <button
              className='py-2 px-4 border-2 border-green-600 font-semibold text-green-600 hover:bg-green-600 hover:text-white disabled:opacity-50'
              onClick={handleCashOnDelivery}
              disabled={cartItemsList?.length === 0 || selectAddress < 0}
            >
              Cash on Delivery
            </button>

            {/* CCAvenue payment option removed */}
          </div>
        </div>
      </div>


      {
        openAddress && (
          <AddAddress close={() => setOpenAddress(false)} />
        )
      }
    </section>
  )
}

export default CheckoutPage
