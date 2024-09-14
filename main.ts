#! /usr/bin/env node

import { differenceInSeconds } from "date-fns";
import inquirer from "inquirer";
import chalk from "chalk";

console.log(
  chalk.bold.magentaBright("\n\t\t\t\t\t ****COUNTDOWN TIMER**** \n\t\t\t\t\t")
);

let countDown = await inquirer.prompt({
  name: "count",
  type: "input",
  message: chalk.yellowBright("Are you ready to start countdown?"),
});

console.log(chalk.redBright.bold("\nLET'S STARTED! :D.....\n"));

function* countdownTimer(second: number) {
  while (second > 0) {
    yield second;
    second--;
  }
}

let timeIterator = countdownTimer(10);

function displayCountdown() {
  let result = timeIterator.next();

  if (!result.done) {
    const now = new Date();
    const countdownTimer = new Date(now.getTime() + result.value * 1000);
    const remainingSeconds = differenceInSeconds(countdownTimer, now);
    console.log(chalk.cyan.bold(`Remaining Seconds: ${remainingSeconds}`));

    setTimeout(displayCountdown, 1000);
  } else {
    console.log(
      chalk.greenBright("\nCountdown Complete!\n"),
      chalk.rgb(400, 200, 100)("WOOOO HOOOOOOO...... :O")
    );
  }
}

displayCountdown();
