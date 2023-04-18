const test = undefined;
let other;
if (typeof test === "undefined") {
  console.log("true");
}

console.log(other === undefined);
console.log(test === undefined);
console.log(test === void 0);
