const express = require('express')
const userRoutes = require('./backend/routes/user-routes')

const app = express();
const PORT = 4000

app.use(express.json());

app.get('/', (req, res) => {
    res.send("This is some content.");
});

app.use('/routes/users', userRoutes);

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
});
