const fs = require("fs");
const path = require("path");
const express = require("express");

const init = (config, models, router, absolutePath = __dirname) => {
  const dir = fs
    .readdirSync(absolutePath)
    .filter((file) => file !== "index.js");

  for (let i = 0; i < dir.length; i++) {
    const file = dir[i];
    const filePath = path.join(absolutePath, file);
    if (fs.statSync(filePath).isDirectory()) {
      const subRouter = express.Router();
      init(config, models, subRouter, filePath);
      console.log(`mounting ${file}`);
      router.use(`/${file}`, subRouter);
    } else {
      const route = require(`./${path.join(
        path.relative(__dirname, absolutePath),
        file
      )}`);
      if (route.init) {
        route.init(router, config, models);
      }
    }
  }
};

module.exports = { init };
