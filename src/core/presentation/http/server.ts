import { app } from "./main";

const PORT = process.env.PORT;

app.listen(PORT || 3333, () => {
    console.log("servidor iniciou...")
});