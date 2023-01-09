const billInput = document.querySelector("#bill-input");
const customInput = document.querySelector("#custom-input");
const percButtons = document.querySelectorAll(".perc-button");
const noOfPeople = document.getElementById("no-of-people");
const tipAmount = document.querySelector(".tip-amount");
const resetBtn = document.getElementById("reset-button");
const total = document.querySelector(".total");
const error = document.getElementById("error");
let perc = 0;

//function to handle error when No of people is undefined on input
function showError() {
     noOfPeople.oninput = function () {
          if (
               noOfPeople.value == 0 ||
               noOfPeople.value == "" ||
               noOfPeople.value < 0
          ) {
               error.style.display = "block";
               this.classList.add("invalid");
               this.style.border = "1px solid red";
          } else {
               this.classList.remove("invalid");
               error.style.display = "none";
               this.style.border = "";
          }

          resetBtn.classList.add("active");
          //Calulate tip amount on input
          calculate();
     };
}

//Run func showError() on page load
showError();

//Run funct calculate() on input
billInput.oninput = function () {
     calculate();
     resetBtn.classList.add("active");
};

//On percBotton click assign it value to a variable(value)
percButtons.forEach((item) => {
     item.addEventListener("click", function (e) {
          value = e.target.value;
          perc = parseFloat(value * 0.01);

          //Calculate tip amount on percentage button click
          calculate();
     });
});

//function to handle all customInput state
function customInputState() {
     //Function to enable custom input
     customInput.oninput = function () {
          perc = this.value * 0.01;

          //Run calculate() function on input
          calculate();
     };

     customInput.onfocus = function () {
          this.style.border = "1.5px solid var(--darkGrayishCyan)";
          this.value = "";
          percButtons.forEach((item) => {
               item.classList.remove("active");
          });
     };

     customInput.onblur = function () {
          this.style.border = "";
     };
}

//Run on page load
customInputState();
//Function to calculate tip amount and tip per person
function calculate() {
     if (!billInput) return;
     if (!noOfPeople) return;

     tipPerPerson = (billInput.value / noOfPeople.value) * perc;
     totalTip = billInput.value / noOfPeople.value + tipPerPerson;

     //Coverting to 2 decimal Places
     tipPerPerson = tipPerPerson.toFixed(2);
     totalTip = totalTip.toFixed(2);

     tipAmount.innerHTML = tipPerPerson;
     total.innerHTML = totalTip;
}

//Function to reset all value to default
function resetAll() {
     resetBtn.classList.remove("active");
     tipAmount.innerHTML = "0.00";
     total.innerHTML = "0.00";
     noOfPeople.value = 0;
     billInput.value = 0;
     customInput.value = "Custom";
}

//event listener to handle the reset function to the reset button
resetBtn.addEventListener("click", resetAll);

percButtons.forEach((element) => {
     element.addEventListener("click", function (e) {
          document.querySelectorAll(".active").forEach((item) => {
               item.classList.remove("active");
          });

          e.target.classList.add("active");
     });
});
