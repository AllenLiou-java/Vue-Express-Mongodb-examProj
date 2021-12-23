const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// 中介軟體 MiddleWare
// parse application/json
app.use(bodyParser.json());
app.use(cors());

const posts = require('./routes/api/posts');

app.use('/api/posts', posts);

// Handle production
if (process.env.NODE_ENV === 'production') {
    // Static folder - 此時即可提供在public資料夾下的所有檔案url
    app.use(express.static(__dirname + '/public/'));

    // Handle SPA
    // res.sendFile() 可以向瀏覽器發送 靜態頁面；
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

