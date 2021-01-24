/* GET home page. */
module.exports = app => {
  return app.get("/", function(req, res, next) {
    res.render("index", { title: "Express" });
  });
};
