try {
// User1 Object creation ---------------------------------------------------------------
const Register1 = {
  FullName1: "Prakash C",
  EmailId1: "prakash49@gmail.com",
  Password1: "Prakash@15580",
  Contact1: 6360792693
};
localStorage.setItem('Register1', JSON.stringify(users)); // storing in local storage
 
// Functions------------------------------------------------------------------------------
function showSlides(m) {
        let i;
        let slides = document.getElementsByClassName("mySlidesShow");
        let dots = document.getElementsByClassName("dotted");
        if (n > slides.length) {slideIndex = 1}
        else {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
       
       
        while ( i < dots.length) {
            dots[i].className = dots[i].className.replace(" active-dotted", "");
            i++;
        }
        slides[slideIndex-1].style.display = "block";
        dots[slideIndex-1].className += " active-dotedt";
    }
 
// constructor----------------------------------------------------------------------------
 
function Login(Id, Password) {
      this.ID = Id;
      this.Password = Password;
      this.Display = function() {
        console.log(`Login Id of User ${this.Id}`);
      };
    }
 
// Js Output disp--------------------------------------------------------------------------
 
// Store booking info in localStorage (or pass via URL)
  localStorage.setItem('bookingDetail', JSON.stringify({
    UserId: UserIdInput.value,
    EventName: EventNameInput.value,
    Members: MembersInput.value,
    Amount: AmountInput.value
  }));
  window.location.href = 'Popup.html';
  window.alert(SucessMessagesOutput);
 
// add user by push-------------------------------------------------------------------------
users.push({
            FullName: FullName,
            Email: Email,
            password: password,
            phone: phone
        });
localStorage.setItem('registeredUser', JSON.stringify(users));
 
// Password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    if (!passwordRegex.test(password)) {
        showPopup('Password must be 8+ characters with 1 uppercase, 1 number & 1 special character.', 'error');
        return;
    }
 
// Open modal on Book Now some operators-----------------------------------------------------
 
const bookButtons = document.querySelectorAll('.book-btn');
bookButtons.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    const card = upcomingEvents[i];
    const eventName = card.querySelector('h3').innerText;
    const priceText = card.querySelector('p:nth-child(5)').innerText;
    selectedPrice = parseInt(priceText.match(/\d+/)[0]);
    eventNameInput.value = eventName;
    membersInput.value = '';
    amountInput.value = '';
    modal.style.display = 'block';
  });
});
 
// Arrays to store user information-----------------------------------------------------------
 
const users = [
  { username: "user1", password: "password123" },
  { username: "user2", password: "securepassword" },
  { username: "admin", password: "adminpass" }
];
 
// checking credentials
function authenticateUser(inputUsername, inputPassword) {
  const foundUser = users.find(user =>
    user.username === inputUsername && user.password === inputPassword
  );
 
  if (foundUser) {
    console.log(`Authentication successful for ${inputUsername}`);
    return true;
  } else {
    console.log("Invalid username or password.");
    return false;
  }
}
 
// Test cases
authenticateUser("user1", "password123"); // Successful
authenticateUser("user2", "wrongpassword"); // Failed
authenticateUser("admin", "adminpass"); // Successful
 
// String Methods -----------------------------------------------------------------------------------
 
    let rawCardNumber = "1234-5678-9012-3456";
    let cleanCardNumber = rawCardNumber.replace(/-/g, ""); // "1234567890123456"
 
    let expiryDate = "10 / 25";
    let formattedExpiry = expiryDate.replace(/\s*\/\s*/, "/"); // "10/25"
 
        let fullCardNumber = "1234567890123456";
    let maskedCardNumber = "**** **** **** " + fullCardNumber.slice(-4); // "**** **** **** 3456"
 
        let customerName = "Prakash Kumar";
    let normalizedName = customerName.toUpperCase(); // "Prakash Kumar"
 
        let potentialVisaCard = "4123...";
    let isVisa = potentialVisaCard.startsWith("4"); // true or false
 
        let cvvInput = "123";
    let isValidCvv = cvvInput.length === 3 || cvvInput.length === 4; // true
 
// Array sort method------------------------------------------------------------------------------------
    passwordHistory.sort((Register1, Register2) => {
      return new TimeRanges(Register1) - new Date(Register2); // Sort by Time
    });
 
 
 
 
    } catch (error) {
    console.error('An error occurred:', error);
}
 