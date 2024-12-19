let continueToShell = true;
let shellPrompt = 'sanika//hoaxShell ';
let currentDirectory = '~/';
const symbol = ' %'
const file = [];

const executeCd = function (args) {
  if (args.length === 0) {
    return "Error : no dirctory specified.";
  }

  currentDirectory = currentDirectory.concat("/", args.join("/"));
  shellPrompt = shellPrompt.concat("/", args);
  return;
}

const executePwd = function () {
  return currentDirectory;
}

const executeEcho = function (args) {
  return args.join(" ");
}

const executeExit = function () {
  continueToShell = false;
  return "Thank you....\n";
}

const executeTouch = function (args) {
  file.push(...args);
  return;
}

const executeLs = function () {
  return file.join("  ");
}

const executeRm = function (args) {
  const fileName = args.join(" ");
  return file.filter((element) => element !== fileName).join(" ");
}

const runCommand = function (commandString) {
  const commandMapping = [
    ['cd', executeCd],
    ['pwd', executePwd],
    ['echo', executeEcho],
    ['ls', executeLs],
    ['touch', executeTouch],
    ['rm', executeRm],
    ['exit', executeExit]
  ];

  const [command, ...args] = commandString.split(" ");

  const doesCommandExits = commandMapping.find(
    (element) => element[0] === command);

  if (doesCommandExits) {
    return doesCommandExits[1](args);
  }

  return "no such command...";
}

const executeShell = function () {
  while (continueToShell) {
    const userCommand = prompt(shellPrompt + symbol);
    if (!userCommand.trim()) continue;

    const resultOfRunningCommand = runCommand(userCommand);

    if (resultOfRunningCommand !== undefined) {
      console.log(resultOfRunningCommand);
    }
  }
}();