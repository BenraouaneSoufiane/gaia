// Import required modules and constants
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import axios from 'axios'; 
// Route segment config
export const runtime = "edge";
 
// Define a function to handle GET requests
export async function GET(req: NextRequest) {
  // Extract title from query parameters
  const { searchParams } = req.nextUrl;
  const desc = searchParams.get("desc");
  var other = searchParams.get("other");
  if(other=='' ||other == null|| other=='undefined'){
    const {data} = await axios.post('https://llama3.gaianet.network/v1/chat/completions',
      {
        "messages":[
          {"role":"system", "content": "You are a helpful assistant."}, 
          {"role":"user", "content": desc}], 
        "model": "Llama-3-8B-Instruct"
      },
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',          
        }
      });
      console.log(data);
      other = data.choices[0].message.content;
  }
  //const fid = searchParams.get("fid");
  //const {data} = await axios.get('https://client.warpcast.com/v2/user-by-fid?fid='+fid)
  //const allowance =  await axios.get('https://api.degen.tips/airdrop2/allowances?fid='+data[0].fid);

  //console.log(data);
  // Fetch the Outfit font frclearom the specified URL
  /*const font = fetch(
    new URL("../../../../public/fonts/outfit-semibold.ttf", import.meta.url),
  ).then((res) => res.arrayBuffer());
  const fontData = await font;*/
  
    const r =  new ImageResponse(
      (
        <div
          style={{          
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: 'white',
            alignItems: "center",
          }}
        >
          <img style={{
            position: "relative",
            top: '150px',
          }} src="https://www.gaianet.ai/images/logo-big.png" width={400}></img>
          <>
          
          <h2
            style={{
              position: "relative",
              textAlign: "center",
              fontSize: 100,
              fontFamily: "Outfit",
              fontStyle: "bold",
              color: "black",
              top: '180px',
              marginRight: '250px',
              marginLeft: '250px',
              marginBottom: '150px'            
            }}
          >
          {desc}  
          </h2>
          </>
          <p style={{
              position: "relative",
              textAlign: "center",
              fontSize: 40,
              top: '40px',
              fontFamily: "Outfit",
              fontStyle: "bold",
              color: "black",
              marginRight: '250px',
              marginLeft: '250px',
              marginBottom: '350px'            

            }} >{other}</p>
         
  
  
        </div>
      ),
      // ImageResponse options
      {
        width: 1920,
        height: 1080
        /*fonts: [
          {
            name: "Outfit",
            data: fontData,
            style: "normal",
          },
        ],*/
      },
    );
    //console.log(r);
    // Create an ImageResponse with dynamic content
    return r
  
  
}