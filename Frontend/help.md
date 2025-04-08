# Frontend Application Setup Guide

> 📌 **Note**: Before proceeding, make sure your **backend is completely up and running**.  
> Refer to [`Backend/help.md`](https://github.com/aka-Harsh/Retail-Store-Data-Analysis/blob/main/Backend/help.md) for backend setup instructions.

## 🧰 Requirements

Ensure the following are installed on your system:
- 🟢 [Node.js](https://nodejs.org/)  
- 🧑‍💻 [VS Code](https://code.visualstudio.com/) or any IDE of your choice  
- 🌐 A web browser (Chrome, Edge, Firefox, etc.)  
- 🎨 Tailwind CSS *(Optional – already integrated via CDN in this project)*

## ⚡ Option 1: Run Existing Frontend Code

Use the provided `Frontend` folder to run the app:

```bash
cd Frontend
npm install
npm run dev
```

✅ The frontend should now be running at:
- Default Vite Port: http://localhost:5173
- Or fallback port: http://localhost:3000

## 🛠️ Option 2: Create Vite + React Project from Scratch (Recommended for Learning)

### Step 1: Open Terminal
Open your Command Prompt/Terminal in the directory where you'd like to create the project.
❗ Do not create the project inside the backend folder.

### Step 2: Verify Node.js Installation
Run the following command to check if Node.js is installed:

```bash
node --version
```

### Step 3: Create Vite + React App
Use this command to create the app:

```bash
npm create vite@latest Retail-Store
```

When prompted, choose:
```
✔ Project name: retail-store
✔ Framework:   react
✔ Variant:     javascript
```

### Step 4: Run the React App

```bash
cd Retail-Store
npm install
npm run dev
```

🎉 Your React + Vite app should now be running at http://localhost:5173

## 🏗️ Integrate Project Code

Once the app is up and running:
1. Copy the folder structure and file architecture from the provided Frontend directory.
2. Replace the default boilerplate code with your project code from the GitHub frontend repo or your working directory.

## 📦 Install Required Packages

You might encounter missing package errors in the terminal.
Install the required packages using:

```bash
npm install package-name
```

📌 For example:

```bash
npm install axios react-router-dom
```

Repeat this step for any other packages shown in the terminal logs.

## ✅ Final Check

After integrating your code and installing the dependencies, restart the app:

```bash
npm run dev
```

🚀 Your frontend should now be live and fully connected to your backend services!
