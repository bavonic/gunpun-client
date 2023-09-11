// export class CreateCarousel {
//   game : Phaser.Scene;
//   themes : []
//   //initial position of themes on stage based on the selected theme
//   setToPosition(prime) {
//     this.themes[prime].x = sizeScene.width / 4;

//     //check if there is another theme available to display on the right side; if yes then position it
//     if (prime < 5 - 1) {
//       this.themes[prime + 1].x = sizeScene.width / 4 + 67 + 75;
//       this.themes[prime + 1].scale.setTo(0.5, 0.5);
//     }

//     //check if there is another theme available to display on the left side; if yes then position it
//     if (prime > 0) {
//       this.themes[prime - 1].x = sizeScene.width / 4 - 67 - 75;
//       this.themes[prime - 1].scale.setTo(0.5, 0.5);
//     }
//   }
//   //move to next theme
//   nextTheme() {
//     //move prime left
//     this.add
//       .tween(themes[prime])
//       .to({ x: xleft }, animationSpeed, null, true);
//     this.game.add
//       .tween(themes[prime].scale)
//       .to({ x: 0.5, y: 0.5 }, animationSpeed, null, true);
//     //move right to prime
//     if (prime < 5) {
//       this.game.add
//         .tween(themes[prime + 1])
//         .to({ x: xprime }, animationSpeed, null, true);
//       this.game.add
//         .tween(themes[prime + 1].scale)
//         .to({ x: 1, y: 1 }, animationSpeed, null, true);
//     }
//     //move new to right
//     if (prime < 4) {
//       themes[prime + 2].x = this.game.width + 150;
//       themes[prime + 2].scale.setTo(0.5, 0.5);
//       this.game.add
//         .tween(themes[prime + 2])
//         .to({ x: xright }, animationSpeed, null, true);
//     }
//     //move left out
//     if (prime > 0) {
//       //themes[prime+1].x = -150;
//       themes[prime - 1].scale.setTo(0.5, 0.5);
//       this.game.add
//         .tween(themes[prime - 1])
//         .to({ x: -150 }, animationSpeed, null, true);
//     }
//     prime++;
//   }

//   //move to previous theme
//   previousTheme() {
//     //move prime left
//     this.game.add
//       .tween(themes[prime])
//       .to({ x: xright }, animationSpeed, null, true);
//     this.game.add
//       .tween(themes[prime].scale)
//       .to({ x: 0.5, y: 0.5 }, animationSpeed, null, true);
//     //move left to prime
//     if (prime > 0) {
//       this.game.add
//         .tween(themes[prime - 1])
//         .to({ x: xprime }, animationSpeed, null, true);
//       this.game.add
//         .tween(themes[prime - 1].scale)
//         .to({ x: 1, y: 1 }, animationSpeed, null, true);
//     }
//     //move new to left
//     if (prime > 1) {
//       themes[prime - 2].x = -150;
//       themes[prime - 2].scale.setTo(0.5, 0.5);
//       this.game.add
//         .tween(themes[prime - 2])
//         .to({ x: xleft }, animationSpeed, null, true);
//     }
//     //move right out
//     if (prime < totalThemes - 1) {
//       //themes[prime+1].x = -150;
//       themes[prime + 1].scale.setTo(0.5, 0.5);
//       this.game.add
//         .tween(themes[prime + 1])
//         .to({ x: game.width + 150 }, animationSpeed, null, true);
//     }
//     prime--;
//   }

//   //click on theme listener
//   clickListener(el) {
//     console.log(this.themes.indexOf(el));
//     var clickedPos = this.themes.indexOf(el);
//     if (clickedPos > prime) {
//       //move to left
//       nextTheme();
//     } else if (clickedPos < prime) {
//       //move to right
//       previousTheme();
//     }
//   }
// }