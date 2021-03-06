const express = require('express')
const cors = require('cors')
const { create, globSource } = require('ipfs-http-client')
const fileUpload = require('express-fileupload');
const app = express();

var allowedOrigins = ['http://3.67.179.30', 'http://127.0.0.1:8000','http://localhost:8000', 'https://www.decentraboard.com'];
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use(fileUpload());


const projectId = '1vgQQehvM3UrKUdfGGDMfd4vYFi'
const projectSecret = 'be2d64142050273a6cdcaf2a44dce81b'
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64')

const ipfsClient = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth
  }
})

app.post('/uploader', async (req, res) => {
    const uploadedFile = await ipfsClient.add(req.files.file.data)
    res.send(uploadedFile)
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});