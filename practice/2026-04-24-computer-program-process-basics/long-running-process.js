console.log("Long running process started.");
console.log(`PID: ${process.pid}`);
console.log("Press Ctrl+C to stop.");

let count = 0;
setInterval(() => {
  count += 1;
  console.log(`heartbeat ${count}`);
}, 2000);
