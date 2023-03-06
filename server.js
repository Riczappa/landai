import  express from "express";
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from "openai";

const fineprompt= "create HTML and CSS code for the following design, you must use bootstrap.min library. Design must be creative and cool. Note that you have to provide only HTML body code, so your answer must start with what comes after '<body>' and end with what comes before </body>. The style must be inside the HTML body. Here is the design: "

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration);

const app = express();
app.use(express.static('client'))

app.use(express.json());



app.get('/',async(req,res)=> {
    res.status(200).send({
        message: 'Hello world',
    })
}   )

app.post('/api',async(req,res)=>{
        try {
        
        const prompt = req.body.prompt;
        
        console.log(fineprompt+prompt)
        const response = await openai.createCompletion ({
            model: "text-davinci-003",
            prompt: fineprompt + prompt,
            temperature: 0.2,
            max_tokens: 1000,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });
        
        res.status(200).send({
            bot: response.data.choices[0].text
        })
        console.log(response.data.choices[0].text)

    } catch (error) {
        console.log(error)
        res.status(500).send({
            error
        })
    }
})

app.listen(5000,() => console.log('server running on port http://localhost:5000'));

