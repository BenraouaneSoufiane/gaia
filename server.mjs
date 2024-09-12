import https from 'https';
import fs from 'fs';
import express from 'express';
import axios from 'axios';
var options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('crt.pem'),
    ca: fs.readFileSync('bundle.pem')
};
const app = express();
// Change this based on your astro.config.mjs, `base` option.
// They should match. The default value is "/".
const base = '/';
app.use(base, express.static('dist/client/'));
app.use(express.json());


app.get('/gaia/img',async(req,res)=>{
    
    const r = await axios.get("http://localhost:3000/api/og/?desc="+req.query.desc+"&other="+req.query.other,{
        responseType: 'arraybuffer'
      });
    const img = Buffer.from(r.data, 'binary');     
    res.set('Content-Type','image/png');
    res.set('Content-Length', img.length);
    res.send(img);
})
app.get('/gaia',async(req,res)=>{ 
  
    res.send(`<!DOCTYPE html><html><head>
      <title>Gaia AI Chat</title>
      <meta property="og:image" content="https://frames.cryptocheckout.co/gaia/img?desc=Welcome to Gaia AI Chat&other=Type something then click send to receive response from the assistant" />
      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content="https://frames.cryptocheckout.co/gaia/img?desc=Welcome to Gaia AI Chat&other=Type something then click send to receive response from the assistant" />
      <meta property="fc:frame:post_url" content="https://frames.cryptocheckout.co/gaia/result" />
      <meta property="fc:frame:input:text" content="Ask or search for something...." />
      <meta property="fc:frame:button:1" content="Send" />
      <meta property="fc:frame:button:1:action" content="post" />
      
      </head></html>`);
  });
  app.post('/gaia/result',async(req,res)=>{ 

  
    res.send(`<!DOCTYPE html><html><head>
      <title>Gaia AI Chat</title>
      <meta property="og:image" content="https://frames.cryptocheckout.co/gaia/img?desc=${req.body.untrustedData.inputText}" />
      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content="https://frames.cryptocheckout.co/gaia/img?desc=${req.body.untrustedData.inputText}" />
      <meta property="fc:frame:post_url" content="https://frames.cryptocheckout.co/gaia/result" />
      <meta property="fc:frame:input:text" content="Ask or search for something...." />
      <meta property="fc:frame:button:1" content="Send" />
      <meta property="fc:frame:button:1:action" content="post" />
      
      </head></html>`);
  });
//app.listen(80);
var server = https.createServer(options,app);
server.listen(443);