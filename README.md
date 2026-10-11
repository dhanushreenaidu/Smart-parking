```markdown
# Smart Parking System 

Smart Parking System is a full-stack web application designed to manage real-time parking spot selection, slot reservations, session timeouts, and administrative revenue tracking using Firebase and Google Maps integration.

The system features role-based access control (Drivers and Administrators) with secure Firestore security rules and real-time data synchronization.

---

## Table of contents

1. [Tech stack](#tech-stack)
2. [High-level architecture](#high-level-architecture)
3. [Project structure](#project-structure)
4. [Authentication & Security Rules](#authentication--security-rules)
5. [Core Features & Implementation](#core-features--implementation)
6. [Local setup & running](#local-setup--running)
7. [Environment & Configuration](#environment--configuration)

---

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JavaScript (ES6+) |
| Backend Services | Firebase SDK v10.7.0 (Auth, Firestore, Analytics, Functions)[cite: 6] |
| Database | Firebase Firestore (NoSQL) |
| Maps & Location | Google Maps / GoMaps Pro API[cite: 12] |
| Hosting & Routing | Firebase Hosting with clean URL rewrites[cite: 7] |

> **Key design principle:** Client-side JavaScript interacts directly with Firebase services, secured by robust server-side Firestore security rules (`firestore.rules`) enforcing data ownership and admin privileges[cite: 10].

---
```
## High-level architecture

┌────────────────────────────────────────────────────────────────────────┐
│                        Browser Frontend (HTML/JS)                      │
│  Pages: index, login, register, location, slot, admin                  │
│  Firebase Client SDKs (Auth, Firestore) · 5-Min Session Timer │
└───────────────┬────────────────────────────────────────┬───────────────┘
│ Real-time snapshots / CRUD queries     │ Auth State
▼                                        ▼
┌──────────────────────────────────────────────┐   ┌─────────────────────┐
│              Firebase Firestore              │   │    Firebase Auth    │
│  Collections: users, bookings, slots         │   │  (Email / Password) │
└──────────────────────────────────────────────>   └─────────────────────┘

```
```
**Request lifecycle**
1. Users authenticate via `login.html` / `register.html` using Firebase Auth[cite: 6, 12].
2. The interactive map (`location.html`) allows users to select coordinates and evaluate live availability via spatial distance checks[cite: 12].
3. Booking submissions write directly to Firestore `bookings` and update slot occupancy states[cite: 6].
4. Administrators (`admin.html`) monitor live revenue, total/active bookings, and process payment confirmations[cite: 6].

---

## Project structure


Smart-parking/
├── public/                     # Hosting public assets
├── index.html                  # Welcome landing page
├── login.html                  # User authentication
├── register.html               # New user account creation
├── location.html               # Interactive map & availability checker
├── slot.html                   # Slot reservation form
├── admin.html                  # Admin dashboard & payment processing
├── 404.html                    # Error fallback page
├── firebase-config.js          # Firebase SDK initialization (smartparking-5ba93)
├── firebase.json               # Hosting rewrites and emulator configuration
├── firestore.rules             # Role-aware database security rules
└── firestore.indexes.json      # Firestore query indexes

```

---

## Authentication & Security Rules

- **Authentication:** Managed via Firebase Auth (`email/password-compat`). Unauthenticated users attempting to access protected views (`location.html`, `admin.html`) are automatically redirected to `login.html`[cite: 6, 12].
- **Role Enforcement:** Checked dynamically on admin routes by querying the `users/{userId}` document for the `isAdmin` boolean flag[cite: 6].
- **Firestore Security (`firestore.rules`)[cite: 10]:**
  - **Users:** Users can read and write only their own profile documents[cite: 10].
  - **Bookings:** Authenticated users can create bookings; updates and deletions are restricted to the booking owner or verified administrators (`isAdmin == true`)[cite: 10].
  - **Slots:** Authenticated users have read/write access to manage slot availability[cite: 10].

---

## Core Features & Implementation

### 1. Interactive Map & Availability Checker (`location.html`)
* **Features:** Integrated Google Maps API centered around GITAM Doddaballapur (`lat: 13.2988, lng: 77.5408`)[cite: 12].
* **Workflow:** Users click anywhere on the map to place a pin marker[cite: 12]. Clicking **Check Availability** evaluates spatial distance against known `occupiedSpots`, dynamically renders a percentage progress bar, and reveals the **Book Slot** button if availability exceeds 10%[cite: 12]. It also includes an active 5-minute session timeout timer[cite: 12].

### 2. Slot Booking & Session Storage (`slot.html`)
* **Workflow:** Retrieves selected coordinate data from browser `sessionStorage`, validates vehicle and contact inputs, and commits reservation documents to Firestore[cite: 12].

### 3. Admin Control Dashboard (`admin.html`)
* **Features:** Real-time statistics tracking Total Bookings, Active Bookings, and Total Revenue (`₹` currency formatting)[cite: 6].
* **Workflow:** Calculates dynamic parking fees based on duration ($₹20$ per hour base rate)[cite: 6]. Administrators can click **Confirm Payment** to update booking status to `completed`, record the final fee, and free up the corresponding parking slot in Firestore[cite: 6]. Includes debounced search filtering by vehicle number or phone number[cite: 6].

---

## Local setup & running

1. Clone the repository
2. Open the directory in **VS Code**.
3. Serve the project locally using Firebase Local Emulators or a static server (e.g., Live Server):
```bash
firebase serve

```


4. Access the application at `http://localhost:5000`.

---

## Environment & Configuration

Firebase project details are configured directly in `firebase-config.js`:

* **Project ID:** `smartparking-5ba93`

* **Auth Domain:** `smartparking-5ba93.firebaseapp.com`

* **Maps API Key:** Configured via GoMaps Pro script integration inside `location.html`.



```

```
