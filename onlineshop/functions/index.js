/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
	"sk_test_51NHM1TKegTPnAwbFCVxDn5uttIiCZi2IUYzecEJsRyVpnZOKZuD9U2UXs2UhD0miYiBZpdCNWvUwWSUtp0TMRnBo00Uz6PAHvn"
);

// APP

// App Config
const app = express();
// MiddleWare
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
// API routes
app.get("/", (request, response) => response.status(200).send("hello world"));
app.post("/payments/create", async (request, response) => {
	const total = request.query.total;
	console.log("payment request received", total);

	const paymentIntent = await stripe.paymentIntents.create({
		amount: total,
		currency: "usd",
	});

	// OK created
	response.status(201).send({
		clientSecret: paymentIntent.client_secret,
	});
});
// Listen Command

exports.api = functions.https.onRequest(app);
//  (http://127.0.0.1:5001/e-commercesite-12cac/us-central1/api)
