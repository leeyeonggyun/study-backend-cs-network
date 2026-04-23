process.stdout.write("Type one line and press Enter: ");

process.stdin.setEncoding("utf8");
process.stdin.once("data", (input) => {
  const line = input.trim();
  console.log(`You typed: ${line}`);
  process.exit(0);
});
