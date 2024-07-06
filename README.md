
# [HOME_TECH] - SNAKE GAME

A basic snake game.


## Tech Stack

 React + TypeScript



## How to use
Make sure that you alrealdy installed NodeJS

In the project directory, you can run the following command

```bash
  npm install

  npm run dev
```


## Completed Tasks

- [x]  User input the width and height for a matrix. 
- [x]  The initial length of the snake is 3. Start at 0x0 position
- [x]  At one time, only 1 bait is randomly appeared on the screen, but not on the current location of the snake.
- [x]  After consume the bait, the length of the snake increase 1 at the head.
- [x]  The snake only move by the head by 1 index at the time, it couldn't move backward through it's body.
- [x]  The body must follow the head movement or the previous body part. Each step takes 1 second.
- The game ends when:
+ [x]  The snake hits the border of the matrix. (Print: You lose)
+ [x]  The snake hits itself. (Print: You lose)
+ [x]  There is no more place for the snake to move. If the body of the snake cover all of the matrix, print: You win. If not, print: You lose.
- [not yet]  Print to console the snake step by step to find and consume the bait (don't clear the console after each step).

## BUGS
- Position of food sometimes overlaps with the positon of the snake!


