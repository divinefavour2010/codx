# Website with Login & Dashboard

## Overview
This project is a **modern, responsive website** that features:

- **Login and Registration Forms** with validation.
- **Dark/Light Mode Toggle** with overlay effect.
- **Splash Screen** on page load.
- **Dashboard** with:
  - Clock
  - Weather
  - To-Do List
  - Notes
  - Calculator

The project uses **HTML, CSS, and JavaScript** without any backend. User data and other inputs are stored in **localStorage**.

---

## File Structure



---

## Features

### 1. Splash Screen
- Displays a logo for **2.5 seconds** on page load.
- Uses **fade-out animation** to transition into the main page.

### 2. Login & Registration
- Popup forms for login and registration.
- Password visibility toggle using icons.
- User data saved in **localStorage**.
- Prevents registration using duplicate emails.

### 3. Dark/Light Mode
- Toggle between dark and light modes.
- Background overlay appears in dark mode.
- Theme toggling works across pages.

### 4. Dashboard
- **Clock** displays current time and date.
- **Weather** widget fetches live weather via [wttr.in](https://wttr.in).
- **To-Do List** allows adding/removing tasks, stored locally.
- **Notes** section for saving text notes locally.
- **Calculator** evaluates mathematical expressions.
- **Logout button** redirects back to login page.

---

## Usage

1. Open **`index.html`** in a browser.
2. Click **Login** or **Register** to open popup forms.
3. Register a new account or login with existing credentials.
4. Upon successful login, you are redirected to **dashboard.html**.
5. On the dashboard:
   - Toggle theme using the **sun/moon button**.
   - Use the **To-Do List**, **Notes**, and **Calculator**.
   - Check **Clock** and **Weather** widgets.
6. Click **Logout** to return to the login page.

---

## Dependencies

- [Ionicons](https://ionicons.com/) for icons.
- JavaScript **enabled** in the browser.
- No backend required; all data stored in **localStorage**.

---

## Customization

- **Images**: Replace logos and splash images in the `images/` folder.
- **CSS**: Modify `styl.css` to change colors, fonts, or layout.
- **JavaScript**: Extend `script.js` to add more widgets or features.

---

## Notes

- **LocalStorage** is browser-specific; data won’t sync across devices.
- Dashboard functionality assumes elements have the correct `id` attributes as in `script.js`.
