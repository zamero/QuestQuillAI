[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/CViV37hj)

# u08 -Business Idea

<span style="color:#; font-family: ; font-size: 4em;">Chat</span> <span style="color:#8B5CF6;font-family: ; font-size: 4em;">Labs</span>

![Chat Labs logo](/chatlabs/src/assets/logo2.png "Chat Labs logo")

# Innehållsförteckning

1. [Installation](#installation)
2. [Kodbas](#kodbas)
3. [Användning](#användning)
4. [Dokumentation](#dokumentation)
5. [Bidragarna](#bidragarna)
6. [Licens](#licens)

# Installation

To get started with this project, follow the steps below:

Clone the repository to your computer:
git clone https://github.com/zamero/u08-business-idea-grupp3-u08
<br>Navigate to the project directory:
Bash
cd chatlabs

Install frontend dependencies with npm:

npm install

Install backend dependencies with npm:
cd ../backend
npm install
Set up MongoDB databas:
Go to app.js in the backend
and change the const dbURI = {your MongoDB URI}

Get it working in localhost:
Change all the instances of "https://chatlabs.up.railway.app/" to http//:localhost:4000/
in the frontend. and create an .env in the frontend with google Oauth key

VITE_CLIENT_ID=googleOAUTHAPI

and in the backend you need another .env file that has the following api keys:
NODE_ENV=development
PORT= 4000
OPENAI_API_KEY=sk-XXX
ELEVENLABS_KEY=5facXXX

Once you got that solved you can use 2 bash consoles to npm run dev in both the backend file and the chatlabs(frontend file)

# Kodbas

Projektet består av följande kodbaser/komponenter

### 1. **Frontend**:

- Beskrivning: Ansvarar för user interface och client-side functionality, funktionalitet, vilket ger en intuitiv och interaktiv upplevelse för användarna.
- Tekniker/bibliotek: React, HTML, CSS, JavaScript, etc.
- Struktur:
  - chatlabs/: huvudmappen
    - src/: Innehåller huvudkällkodsfilerna.
      - components/:
        _ CharacterForm.tsx:
        _ ChatPrompt.tsx:
        _ Footer.tsx:
        _ NavBar.tsx: \* Steps.tsx: .
        <br>
      - pages/:
        - Dashboard.tsx:
        - db-2.tsx:
        - db-4.tsx:
        - FormModal.tsx:
      - App.tsx:
      - index.css:
      - main.tsx :

### 2. **Backend**:

- Beskrivning: Hanterar logik på serversidan, databehandling och interagerar med databaser eller externa API:er
- Tekniker/bibliotek: Node.js, Express, MongoDB/Mongoose, etc.
- Struktur:
  - backend/: huvudmappen.
    - app.js:
    - userCRUD.js
    - userSchema.js

# Användning

## Chat labs is a Chat NPC service for game developers to make AI generated interactive NPC:s for their games.

### Example use case:

You are creating a game set in a world where magicians and humans live along side each other. A dragon is said to threaten the village, and living somewhere in the mountains. You need a character guiding your main character to the mountains and provide them with information. Create that character with Chat labs! Just write a short backstory, give the NPC a name and personality traits, hit _create_ and there you have it! You can now chat with the character, saying what you want them to say and download the sound file to use in your game.

This is not limited to video games, but can also be used in a more traditional board game context, for example D&D. Just have fun and be creative!

Happy developing!
/ Chat labs team

# Dokumentation

Daily-Scrums:
https://docs.google.com/document/d/1LMuhqvmej-LUDXtamVxOSvMyaCqgHevOQF9dOItwGDQ

Mongoose Schema:
https://cdn.discordapp.com/attachments/1103323453068673124/1105118330131599380/ER-diagram-v2.png

Figma initial sketch:
https://www.figma.com/file/r8tbrfqE1j1VS8NlltcdzL/The-AI-Artist?type=design&node-id=0-1&t=Xlo4QOVlnC3OZNYj-0

# Bidragarna

Samer Essam
https://github.com/zamero
https://www.linkedin.com/in/samer-essam-9908b41a2/

Ghanemla lamloumi
https://github.com/Ghanemla

Isabelle Johannesson
https://github.com/isabellejohannesson
https://www.linkedin.com/in/isabellejohannesson

Sandra Rehnström
https://www.linkedin.com/in/sandra-rehnstr%C3%B6m-54a547188/

Nejirwan Ramadan
https://github.com/NRiCe31
https://www.linkedin.com/in/nejirwan-ramadan/

Camilla Gustafsson
https://github.com/Camgus89
https://www.linkedin.com/in/camilla-gustafsson-1951aa136/

# Licens

MIT LICENSE:
https://github.com/zamero/u08-business-idea-grupp3-u08/blob/main/LICENSE
