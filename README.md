# 🔢 Sorting Visualizer

A clean, interactive web application to **understand how sorting algorithms actually work**, not just how they look in code.

Instead of reading abstract logic, this project lets you **see every comparison, swap, and overwrite step-by-step**, making sorting algorithms intuitive and memorable.

---

## 🚀 Live Demo

**Try it here:**  
**[🌐 Live Demo: Access the Visualizer Here](https://sorting-visualizer-liart-sigma.vercel.app/)**

---

## 📌 What is this project?

Sorting Visualizer is a **visual learning tool** built for:

- Students learning Data Structures & Algorithms
- Developers revising core concepts
- Anyone curious about how data gets sorted internally

Each algorithm is animated using bars that represent array values.  
As the algorithm runs, you can clearly see:

- Which elements are being compared
- When swaps happen
- How the array slowly becomes sorted

This is not just animation — it’s **algorithm logic turned into motion**.

---

## 🧠 How it works (under the hood)

This project is **not hard-coded animations**.

### 1️⃣ Algorithm → Events

Each sorting algorithm is written in a clean, readable way and **emits events** such as:

- Compare two indices
- Swap values
- Overwrite a value
- Mark elements as sorted

These events describe _what_ the algorithm is doing — not _how_ it looks.

---

### 2️⃣ Event Player

The event list is passed to a centralized **Event Player**, which:

- Plays events one-by-one
- Controls animation speed
- Keeps visuals and logic perfectly in sync

This separation makes the system:

- Easy to debug
- Easy to extend
- Easy to add new algorithms

---

### 3️⃣ Visualizer (Bar Array)

The bar visualizer listens to events and updates:

- Bar heights
- Colors (active, comparing, sorted)
- Transitions and delays

Because logic and UI are separated, **any algorithm can be visualized consistently**.

---

## 📚 Algorithms Included

### Comparison-Based

- Bubble Sort
- Selection Sort
- Insertion Sort
- Merge Sort
- Quick Sort
- Heap Sort

### Non-Comparison-Based

- Counting Sort
- Radix Sort

### Hybrid

- Tim Sort

Each algorithm includes:

- A short human-readable description
- Its time complexity
- A visualization-friendly implementation

---

## 🎨 UI & UX Philosophy

This project focuses heavily on **clarity and comfort**:

- Dark theme to reduce eye strain
- Smooth animations without visual noise
- Responsive layout (desktop-first, mobile-safe)
- Clean typography and spacing
- No unnecessary distractions

Everything is designed so users **focus on learning**, not clicking.

---

## 🛠️ Tech Stack

- **React + TypeScript**
- **React Router**
- Inline style system (theme-consistent)
- Custom animation/event engine
- No heavy UI libraries — lightweight and fast

---

## 📁 Project Structure (simplified)

```text
src/
├── algorithms/        # Sorting algorithm implementations
│   └── registry.ts
├── core/              # Event system & player
│   └── EventPlayer.ts
├── visualizer/        # Bar array rendering
│   └── BarArray.tsx
├── pages/
│   ├── Home.tsx
│   └── Visualizer.tsx
├── components/        # Reusable UI components
└── utils/             # Helpers (array generation, shuffle, etc.)
```

---

## 🧪 Who is this for?

- 📘 Students preparing for exams or interviews
- 👨‍💻 Developers revising DSA concepts
- 🎓 Teachers explaining algorithms visually
- 🧠 Anyone who learns better by _seeing_ instead of reading

---

## 🤝 Contributing

Contributions are welcome!

You can:

- Add new algorithms
- Improve animations
- Optimize performance
- Enhance UI/UX
- Fix bugs or edge cases

Just fork the repo, create a branch, and submit a PR.

---

## 👨‍💻 Author

**Abhishek Patil**

- GitHub: [GitHub](https://github.com/06-abhishek/)
- LinkedIn: [LinkedIn](https://www.linkedin.com/in/abhishek-patil-27759630b/)
- Email: [Email](mailto:abhishekp.7841@gmail.com)

---

## ⭐ Final Note

This project is built with the belief that:

> _Algorithms are not hard, they’re just invisible._

This visualizer exists to make them **visible, understandable, and enjoyable**.
