let myName = "Jay";
const obj = {
  get name() {
    return myName;
  },
};

console.log(obj.name); // Jay
myName = "Anjali";
console.log(obj.name); // Anjali

obj.name = "Marcus";
console.log(obj.name); // Anjali
