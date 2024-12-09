How to Run the Project

Follow these steps to get the project up and running:
Prerequisites

    Node.js: Ensure Node.js is installed. You can download it from the Node.js website.
    Android Studio: Install Android Studio and set up the Android SDK if you plan to run the app on an Android emulator or device.
    Xcode (macOS only): Install Xcode from the Mac App Store if you plan to run the app on an iOS simulator or device.
    React Native CLI: The project uses the React Native CLI to manage the development environment.

For Android:

    Ensure you have Android Studio set up and an emulator running or a physical device connected.

    To run the app on an Android emulator/device:
    npm start
    And select Android


Design Choices
1. Form Handling and Validation

    Formik: Form handling is managed using Formik, a popular library for managing forms in React Native. It allows for easy integration of form state and validation.
    Yup: For form validation, Yup is used, which is a schema builder for runtime value parsing and validation. It integrates seamlessly with Formik to provide form field validation.

2. Navigation

    React Navigation: React Navigation is used to manage the app's screen transitions. We’ve used a Stack Navigator to handle the navigation between the SignUp and Login screens.

3. User Interface

    Simple and Accessible UI: The UI is kept simple for ease of use. The form inputs are designed to be clear and straightforward, with basic validation messages displayed on the UI.
    Responsive Design: The layout adapts to different screen sizes and orientations, ensuring that the app works well on both phones and tablets.

Assumptions and Limitations
Assumptions

    Basic User Authentication: The app is designed to handle the basic structure of SignUp and Login screens. It does not integrate with a real back-end or authentication service; the form submission is for demonstration purposes.
    Local Storage: For the "Remember Me" functionality in the Login screen, the email address is saved in local storage using AsyncStorage.
    Platform Support: The app supports both Android and iOS platforms. It is assumed that the developer has the required development environment set up (Android Studio for Android and Xcode for iOS).

Limitations

    No Backend Integration: There is no actual backend server integrated for user authentication. The user credentials are not sent anywhere, so the form submission only triggers a success message.
    Password Strength Indicator: Although a password strength indicator was planned as part of the bonus functionality, it hasn’t been implemented in this version of the app.
    Limited Form Features: The form handling is relatively basic. For production-level apps, additional features such as password reset, email validation, and input sanitization may be required.
    No Error Handling for Real Authentication: There is no error handling or integration with a real API for user authentication. The "Sign Up" and "Login" actions are only simulated, with static success messages.
