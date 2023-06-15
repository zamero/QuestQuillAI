require("dotenv").config();

const express = require("express")
const cors = require("cors")
const fs = require("fs")
const app = express()
const { create, readAll, read, update, deleteChar } = require("./userCRUD")
const User = require("./userSchema")
const axios = require('axios');
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args))
const bodyparser = require("body-parser")

const user1 = User.find("email")
// const char1 = user1.Characters[1]

const mongoose = require("mongoose");
const dbURI = "mongodb+srv://chatlabsTeam:nospamarenointhechaterino@charlabs.icuqwds.mongodb.net/Chatlabs";
// connect to database
mongoose.connect(dbURI, { useNewUrlParser: true });
const db = mongoose.connection;
// if error
db.on("error", (err) => {
  console.error(`err: ${err}`);
}); // if connected
db.on("connected", (err, res) => {
  console.log("Connected to database");
});


// create a server-PORT
const PORT = 4000;
// const PORT = process.env.PORT || 4000;

// cors är bra så att vi kan ha server och client isär
app.use(cors({origin:"*"}));
// parse json objects
app.use(express.json());
// parse url encoded objects- data sent through the url
app.use(express.urlencoded({ extended: true }));


app.put("/create/:id", async (req, res) => {
  try {
    const { name, backstory, traits } = req.body;
    const user = await User.updateOne(
      { _id: req.params.id },
      { $push: { Characters: { name, backstory, traits } } }
    );
    if (user.nModified === 0) {
      throw new Error("User not found");
    }
    res.status(200).json({
      message: "Character added to user",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
app.delete("/delete/:id/:index", async (req, res) => {
  try {
    const { id, index } = req.params;
    const user = await User.findByIdAndUpdate(
      { _id: id },
      { $unset: { [`Characters.${index}`]: 1 } },
      { new: true }
    );

    if (!user) {
      throw new Error("User not found");
    }

    user.Characters = user.Characters.filter((_, i) => i != index); // Remove the element at the specified index

    await user.save();

    res.status(200).json({
      message: "Character removed from user",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.put("/edit/:id/:index", async (req, res) => {
  try {
    const { name, backstory, traits } = req.body;
    const { id, index } = req.params;
    const user = await User.findOneAndUpdate(
      { _id: id },
      { $set: { [`Characters.${index}`]: { name, backstory, traits } } }
    );
    if (user.nModified === 0) {
      throw new Error("User not found");
    }
    res.status(200).json({
      message: "Character added to user",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.post('/prompt/:id/:index', async (req, res) => {
  try {
    const { id, index } = req.params;
    const { ask } = req.body; // Assuming the prompt is passed as {"prompt": "Your prompt here"} in the request body
    const user = await User.findOne({ _id: id });

    if (!user) {
      throw new Error('User not found');
    }

    const character = user.Characters[index];

    let gptPrompt = `I'm going to give you a character in a video game and I want you to answer the player as if you are the character. Here are the specifics for the character. Personality trait for the character={${character.traits}}. Name = {${character.name}}. Backstory={${character.backstory}} The player asks the following={${ask}} Just answer in first person as ${character.name} and do not give any actions as an answer, also do not describe what it does only quotes. Answer in dialogues. and do not give me the characters name at the beginning like this for example= Name: {answer} just give me the {answer} in quotes.`
    // console.log(character.name)
    // console.log(character.backstory)
    // console.log(character.traits)

    const apiKey = process.env.OPENAI_API_KEY
    // Make a request to another API using Axios
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        "model": "gpt-3.5-turbo",
        "messages": [
          {
            "role": "user",
            "content": `${gptPrompt}`
          }
        ]

      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          "OpenAI-Organization": "org-5l5Gk68z2cUziB1qLBYPugOq"
        }
      }
    );

    // Access the response data
    // const apiData = response.data;
    const apiData = response.data.choices[0].message.content;

    const voiceResponse = await axios.post(
      'https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM?optimize_streaming_latency=0',
      {
        "text": `${apiData}`,
        "model_id": "eleven_monolingual_v1",
        "voice_settings": {
          "stability": 0,
          "similarity_boost": 0
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': process.env.ELEVENLABS_KEY
        },
        responseType: 'arraybuffer' // Set the response type to 'arraybuffer'
      }
    );

    const apiVoiceData = voiceResponse.data;
    res.set("Content-Type", "audio/mpeg");
    res.status(200).send(apiVoiceData);
  } catch (error) {
    res.status(500).send(
      error.message,
    );
  }


});


 app.get("/getone/:id/:index", async (req, res) => {
   try {
     const { id, index } = req.params;
     const user = await User.findOne({ _id: id });
     if (!user) {
       throw new Error("User not found");
     }
     const character = user.Characters[index];
     res.status(200).json({
       message: "Character retrieved",
       character,
     });
   } catch (error) {
     res.status(500).json({
       message: error.message,
     });
   }
 });

 app.get("/getid/:sub/", async (req, res) => {
  try {
    const { sub } = req.params;
    const user = await User.findOne({ sub: sub });

    if (!user) {
      throw new Error("User not found");
    }

    const userId = user._id;

    res.status(200).json({
      userId,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.post("/createuser", async (req, res) => {
  // Check if req.body is empty
  if (!Object.keys(req.body).length) {
    res.status(400).json({
      message: "Request body cannot be empty",
    });
    return;
  }

  const { email, sub } = req.body;

  // Check if the email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(409).json({
      message: "User with the provided email already exists",
    });
    return;
  }

  if (email === "undefined") {
    res.status(409).json({
      message: "Something went wong",
    });
    return;
  }

  const character = await create({ email, sub });

  if (character.error) {
    res.status(500).json({
      message: character.error,
    });
  } else {
    res.status(201).json({
      message: "New character record created",
    });
  }
});


app.get("/characters/:id", async (req, res) => {
  const characters = await read();
  const { id } = req.params;
  const user = await User.findOne(
    { _id: req.params.id },
  );
  if (user.error) {
    res.status(500).json({
      message: error.message,
      characters: characters.data,
    });
  }
  else {
    res.status(200).json({
      message: "success",
      characters: user.Characters,
    });
  }
});

//app.get('/characters/:id/:charId', async (req, res) => {
//    try {
//      const { id, charId } = req.params;
//      const user = await User.findOne({ _id: id });
//      if (!user) {
//        throw new Error('User not found');
//      }
//      const character = user.Characters.find(char => char._id.toString() === charId);
//      if (!character) {
//        throw new Error('Character not found');
//      }
//      res.status(200).json({
//        name: character.name,
//        backstory: character.backstory,
//        traits: character.traits
//      });
//    } catch (error) {
//      res.status(500).json({
//        message: error.message,
//      });
//    }
//  });
//


// app.delete("/books/:bookID", async (req, res) => {
//     const isDeleted = await deleteBook(req.params.bookID);
//     if (isDeleted.error) {
//         res.status(500).json({
//             message: isDeleted.error,
//         });
//     }
//     else {
//         res.status(200).json({
//             message: "Deleted Successfully",
//         });
//     }
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
