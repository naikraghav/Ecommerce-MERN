const stripe = require('../../config/stripe')
const orderModel = require('../../models/orderProductModel')
const addToCartModel = require('../../models/cartProduct')

const endpointSecret = process.env.STRIPE_ENPOINT_WEBHOOK_SECRET_KEY

async function getLineItems(lineItems) {
  let ProductItems = []

  if (lineItems?.data?.length) {
    for (const item of lineItems.data) {
      const product = await stripe.products.retrieve(item.price.product)
      const productId = product.metadata.productId

      const productData = {
        productId: productId,
        name: product.name,
        price: item.price.unit_amount / 100,
        quantity: item.quantity,
        image: product.images
      }
      ProductItems.push(productData)
    }
  }

  return ProductItems
}

const webhooks = async (request, response) => {
  const sig = request.headers['stripe-signature']
  console.log("🔔 Webhook received", sig);
  const payloadString = request.body.toString() // raw body is needed

  let event

  try {
    event = stripe.webhooks.constructEvent(payloadString, sig, endpointSecret)
    console.log("✅ Webhook received:", event.type)
  } catch (err) {
    console.error("❌ Webhook Error:", err.message)
    return response.status(400).send(`Webhook Error: ${err.message}`)
  }

  console.log("👉 Event type:", event.type);

  // Handle event types
  switch (event.type) {
    case 'checkout.session.completed': {
      try {
        const session = event.data.object
        console.log("🔹 Checkout session:", session.id)

        // Fetch line items
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id)
        const productDetails = await getLineItems(lineItems)

        const orderDetails = {
          productDetails,
          email: session.customer_email,
          userId: session.metadata?.userId || null,
          paymentDetails: {
            paymentId: session.payment_intent,
            payment_method_type: session.payment_method_types,
            payment_status: session.payment_status,
          },
          shipping_options: session.shipping_options
            ? session.shipping_options.map(s => ({
              ...s,
              shipping_amount: s.shipping_amount / 100
            }))
            : [],
          totalAmount: session.amount_total / 100
        }

        // Save order
        const order = new orderModel(orderDetails)
        const savedOrder = await order.save()
        console.log("✅ Order saved:", savedOrder._id)

        // Clear user’s cart
        if (savedOrder?._id && session.metadata?.userId) {
          await addToCartModel.deleteMany({ userId: session.metadata.userId })
          console.log("🗑️ Cart cleared for user:", session.metadata.userId)
        }
      } catch (err) {
        console.error("❌ Error saving order:", err.message)
      }
      break
    }

    default:
      console.log(`⚠️ Unhandled event type: ${event.type}`)
  }

  response.status(200).send()
}

module.exports = webhooks
