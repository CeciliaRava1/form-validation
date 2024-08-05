import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCORTymPtzzRjY1-nbx7P0Zmqi5OTq3aR0",
    authDomain: "form-validation-b728f.firebaseapp.com",
    projectId: "form-validation-b728f",
    storageBucket: "form-validation-b728f.appspot.com",
    messagingSenderId: "458809355245",
    appId: "1:458809355245:web:9e160728cea6b2200495e4",
    measurementId: "G-3KFCB5WBTY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

document.getElementById('form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Avoid cleaning the form by HTML

    // Validate name
    let inputName = document.getElementById('name');
    let errorName = document.getElementById('nameError');

    if (inputName.value.trim() === '') {
        errorName.textContent = 'Please, input your name';
        errorName.classList.add('error-message');
    } else {
        errorName.textContent = '';
        errorName.classList.remove('error-message');
    }

    // Validate email
    let inputEmail = document.getElementById('email');
    let errorEmail = document.getElementById('emailError');
    let emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

    if (!emailPattern.test(inputEmail.value)) {
        errorEmail.textContent = 'Please, input a valid email';
        errorEmail.classList.add('error-message');
    } else {
        errorEmail.textContent = '';
        errorEmail.classList.remove('error-message');
    }

    // Validate password
    let inputPassword = document.getElementById('password');
    let errorPassword = document.getElementById('passwordError');
    let passwordPattern =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;

    if (!passwordPattern.test(inputPassword.value)) {
        errorPassword.textContent = 'The password must have a minimum of 8 characters and include uppercase letters, lowercase letters, numbers, and special characters';
        errorPassword.classList.add('error-message');
    } else {
        errorPassword.textContent = '';
        errorPassword.classList.remove('error-message');
    }

    // Submit form
    if (!errorName.textContent && !errorEmail.textContent && !errorPassword.textContent) {
        try {
            const docRef = await addDoc(collection(db, "users"), {
                name: inputName.value,
                email: inputEmail.value,
                password: inputPassword.value
            });
            alert('The form has been submitted', docRef.id);
        } catch (error) {
            console.error("Error adding document: ", error);
        }

        document.getElementById('form').reset();
    }
});
