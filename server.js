const app = require("./app")
const { PORT } = require("./config")

//pretty colors
require("colors")




app.listen(PORT, function () {
    console.log(`🚀 API-Server`.blue, `is up and running on`.red, `http://localhost:${PORT} 🚀`.yellow)
})
