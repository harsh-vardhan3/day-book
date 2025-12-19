const Sentiment = require("sentiment");

const sentiment = new Sentiment();

/**
 * Analyzes text and returns sentiment score and mood emoji
 * @param {string} text - The text to analyze
 * @returns {object} - { score, mood, intensity }
 */
const analyzeSentiment = (text) => {
  if (!text || typeof text !== "string") {
    return { score: 0, mood: "😐", intensity: "neutral" };
  }

  const result = sentiment.analyze(text);
  const score = result.score;

  // Map sentiment score to mood and intensity
  let mood, intensity;

  if (score > 3) {
    mood = "😄"; // Very positive
    intensity = "very positive";
  } else if (score > 1) {
    mood = "🙂"; // Positive
    intensity = "positive";
  } else if (score > -1) {
    mood = "😐"; // Neutral
    intensity = "neutral";
  } else if (score > -3) {
    mood = "😔"; // Negative
    intensity = "negative";
  } else {
    mood = "😢"; // Very negative
    intensity = "very negative";
  }

  return {
    score,
    mood,
    intensity,
    comparative: result.comparative,
  };
};

module.exports = analyzeSentiment;
