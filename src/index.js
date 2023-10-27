const express = require("express");
const app = express();
const port = 3000;
const webHookConfigurator = require("./models/webHookConfigurator.js");
const axios = require("axios");

app.use(express.json());

// using the webHookConfigurator to add delete and manage the webHooks
app.use("/api/v1/", webHookConfigurator);

/**
 *  endpoint that listen for the route trigger and get the list of webhooks i
 *  match the list with the event name coming from request
 *  if it finds a match it call  the webhook url and send the request data
 *  if its ok it return the response if it fails return error 500
 *  if not match return error 404
 */
app.use("/api/v1/trigger", async (req, res) => {
  const webHooks = await webHookConfigurator.webhooks.list();
  try {
    webHooks.data.forEach((webhook) => {
      if (req.data.eventName === webhook.eventName) {
        axios.post(webhook.url, webhook.data).then((response) => {
          res.status(200).send({ response: response });
          res.end();
        }).catch((error) => {
            return res.status(504).send("Internal Server Error");
        });
      }else{
        return res.status(404).send("Event not found");
      }
      return;
    });
  } catch (error) {
    console.log(error);
  }
});

// this is just a test route to check if the api is working
app.get("/", (req, res) => res.send("Api is alive"));

app.listen(port, () => console.log(`App listening at http://localhost:3000`));
