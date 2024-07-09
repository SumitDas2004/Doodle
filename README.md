
# Doodle

**Description:** 
Doodle is a multiplayer sketching and guessing where 2-8 players can connect over the network and play the game, where at one time one player acts as an artist drawing on a shared canvas and others need to guess the drawing.

**Flow:** 
- Users can create a new room or join an existing room. After creating a room user will be provided with a _roomId_ with which others can join the room.

- At one time there is one room owner who has the authority to start a new game. Room owners can decide the number of rounds to be conducted and duration of each turn (drawtime).

- At the starting of each turn drawer is provided with a 3 words/topics. The drawer can choose any one of them and start drawing.

- The other users need to guess the word and write down them in the chatbox. If the guess is right then all the players are notified and the guessor's chatbox get disabled.

- After end of every turn a window appears with the score earned by every user. And after the end of the game the ranking page is shown.


## Demo
https://doodlefrontend.vercel.app/

## Tech Stack

**Client:** Javascript, ReactJS, Redux, TailwindCSS

**Server:** Java, SpringBoot


## Acknowledgements

 - [Canvas ](https://www.npmjs.com/package/react-canvas-draw)
 - [Loading animations](https://www.npmjs.com/package/react-spinners)
 - [ Toast notifications ](https://www.npmjs.com/package/react-toastify)
- [ Random word generator ](https://www.npmjs.com/package/random-word-slugs)
- [ User avatar ](https://www.dicebear.com/)
## Color Reference

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Darker blue | ![#4a53b5](https://via.placeholder.com/10/4a53b5?text=+) #4a53b5 |
| Lighter blue | ![#9da8f1](https://via.placeholder.com/10/9da8f1?text=+) #9da8f1 |
| Pink | ![#00b48a](https://via.placeholder.com/10/ee7ab1?text=+) #ee7ab1 |
| Playerlist item background colour | ![#69e621](https://via.placeholder.com/10/69e621?text=+) #69e621 |


## Screenshots

![Create/Join room page](https://github.com/SumitDas2004/Doodle/blob/main/join-create-room.png?raw=true)

![Playing area](https://github.com/SumitDas2004/Doodle/blob/main/playerarea.png?raw=true)
