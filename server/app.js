const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.use(
  express.json({
    type: ["application/json", "text/plain"],
  })
);
app.post(`/api`, async (req, res) => {
 
});

app.listen(port, () => {
  console.log(`Start server ${port}`);
});
