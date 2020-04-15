const os = require("os");
const router = require("express").Router();

router.route("/").get((req, res) => {
  try {
    const cpus = os.cpus().length;
    const loadAverage = os.loadavg()[0] / cpus;
    const time = new Date().getTime();
    const result = {
      loadAverage,
      time,
    };
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
