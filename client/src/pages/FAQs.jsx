import React, { useState } from 'react'

const COMPANY = {
  name: 'Indiaonroaming Pvt Ltd',
  email: 'ops@indiaonroaming.com',
  mobile: '+91 96509 01450',
  address: 'G-57, Ground Floor, Westend Mall, Janak Puri, New Delhi - 110058',
  app: 'https://bigebucket.com'
}

const faqs = [
  {
    q: 'What is Bigebucket (app)?',
    a: 'Bigebucket is a quick-commerce style marketplace app similar to Blinkit — a fast, local shopping experience for groceries, essentials and daily needs. Our version is powered by Indiaonroaming Pvt Ltd and available at https://bigebucket.com.'
  },
  {
    q: 'How do I place an order?',
    a: 'Browse products on the app, add to cart, and go to Checkout. Choose your delivery slot and preferred payment method (Card/UPI/Cash). You will receive order confirmation and live updates via the app.'
  },
  {
    q: 'What payment methods do you support?',
    a: 'We support popular online payment methods (UPI, Netbanking, Cards) and Cash on Delivery where available. For any payment issues contact us at ops@indiaonroaming.com.'
  },
  {
    q: 'How long does delivery take?',
    a: 'Delivery time depends on your location and selected slot. In most metro locations we offer ultra-fast deliveries (minutes to an hour). You will see the estimated delivery time at checkout.'
  },
  {
    q: 'Can I return or cancel an order?',
    a: 'If your order hasn\'t been dispatched you can cancel from the Orders screen. For returns or refunds please visit the Refunds section or contact our support with your order id.'
  },
  {
    q: 'How do I become a seller or partner?',
    a: 'We welcome partners. Please reach out to our team with business details and location. Email: ops@indiaonroaming.com or call +91 96509 01450.'
  },
  {
    q: 'Is my data secure?',
    a: 'We take user privacy seriously. Sensitive data is stored according to industry standards. Refer to our Privacy Policy page for details.'
  },
  {
    q: 'Where is your registered office?',
    a: COMPANY.address
  }
]

const AccordionItem = ({ item, open, onToggle }) => (
  <div className="border rounded-md overflow-hidden">
    <button onClick={onToggle} className="w-full text-left px-4 py-3 bg-white flex items-center justify-between">
      <span className="font-medium">{item.q}</span>
      <span className="text-gray-500">{open ? '−' : '+'}</span>
    </button>
    {open && (
      <div className="px-4 py-3 bg-gray-50 text-gray-700">
        <p className="whitespace-pre-line">{item.a}</p>
      </div>
    )}
  </div>
)

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className="max-w-4xl mx-auto my-12 px-4">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
        <p className="mt-2 text-gray-600">Quick answers about {COMPANY.name} and the {COMPANY.app} app.</p>
      </header>

      <section className="grid gap-4">
        {faqs.map((f, idx) => (
          <AccordionItem
            key={idx}
            item={f}
            open={openIndex === idx}
            onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
          />
        ))}
      </section>

      <section className="mt-8 border-t pt-6">
        <h2 className="text-xl font-semibold mb-2">Still need help?</h2>
        <p className="text-gray-700">Contact our support team —</p>
        <ul className="mt-3 text-gray-700 space-y-1">
          <li><strong>Phone:</strong> <a href={`tel:${COMPANY.mobile}`} className="text-green-700">{COMPANY.mobile}</a></li>
          <li><strong>Email:</strong> <a href={`mailto:${COMPANY.email}`} className="text-green-700">{COMPANY.email}</a></li>
          <li><strong>Address:</strong> {COMPANY.address}</li>
          <li><strong>App/Website:</strong> <a href={COMPANY.app} className="text-green-700" target="_blank" rel="noreferrer">{COMPANY.app}</a></li>
        </ul>
      </section>
    </div>
  )
}

export default FAQs
