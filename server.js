const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// In-memory data (replace with DB in production)
const quizQuestions = [
  {
    id: 1,
    question: "తెలంగాణ రాష్ట్ర పండుగ ఏమిటి?",
    options: ["బతుకమ్మ", "పొంగల్", "ఒణం", "దుర్గాపూజ"],
    answer: 0
  },
  {
    id: 2,
    question: "యాదగిరిగుట్ట ఆలయం ఎవరి ఆలయం?",
    options: ["శివుడు", "లక్ష్మీనరసింహ స్వామి", "వేంకటేశ్వర స్వామి", "రాముడు"],
    answer: 1
  }
];

let leaderboard = [
  { name: "అన్విత", score: 98 },
  { name: "వేదాంత్", score: 95 },
  { name: "సాహితి", score: 92 }
];

// Middleware
app.use(express.static(path.join(__dirname)));
app.use(bodyParser.json());

// API: Get quiz questions
app.get('/api/quiz', (req, res) => {
  res.json(quizQuestions.map(q => ({
    id: q.id,
    question: q.question,
    options: q.options
  })));
});

// API: Submit quiz answers
app.post('/api/quiz/submit', (req, res) => {
  const { answers } = req.body; // answers: [{id: 1, answer: 0}, ...]
  let score = 0;
  answers.forEach(ans => {
    const q = quizQuestions.find(q => q.id === ans.id);
    if (q && q.answer === ans.answer) score++;
  });
  res.json({ score });
});

// API: Get leaderboard
app.get('/api/leaderboard', (req, res) => {
  res.json(leaderboard.slice(0, 10));
});

// API: Submit new leaderboard score
app.post('/api/leaderboard', (req, res) => {
  const { name, score } = req.body;
  if (typeof name === 'string' && typeof score === 'number') {
    leaderboard.push({ name, score });
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard = leaderboard.slice(0, 10); // Keep top 10
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, message: "Invalid data" });
  }
});

// Example API endpoint
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Welcome to TeluguRoots backend!' });
});

// Fallback to index.html for SPA support
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`TeluguRoots server running at http://localhost:${PORT}`);
});