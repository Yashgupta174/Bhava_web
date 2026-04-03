/**
 * @desc    Get AI Response (Spiritual Guide)
 * @route   POST /api/ai/chat
 * @access  Private
 */
export const getAiResponse = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ success: false, message: "Please provide a message" });
  }

  try {
    // 🪔 BHAVA SPIRITUAL KNOWLEDGE ENGINE
    const input = message.toLowerCase();
    let response = "";

    // Keyword-based spiritual wisdom
    if (input.includes("gita") || input.includes("krishna") || input.includes("arjuna")) {
      response = "In the Bhagavad Gita, Lord Krishna teaches us the path of Nishkama Karma—performing one's duty without attachment to the results. 'You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions.' How can you apply this surrender in your current situation?";
    } else if (input.includes("peace") || input.includes("calm") || input.includes("anxiety") || input.includes("stress")) {
      response = "Peace is not the absence of conflict, but the presence of stillness within. Breathe deeply. Remember the Vedic teaching: 'Om Shanti, Shanti, Shanti.' Peace of body, peace of mind, peace of soul. Try a 5-minute focused breathing session in the Bhava 'Daily Practices' section.";
    } else if (input.includes("meditation") || input.includes("how to pray") || input.includes("focus")) {
      response = "Prayer is speaking to the Divine; Meditation is listening. Begin by silencing the external world. Focus on a single point—a mantra like 'Om' or simply your breath. As thoughts arise, acknowledge them like passing clouds and return to the center.";
    } else if (input.includes("purpose") || input.includes("dharma") || input.includes("meaning")) {
      response = "Your Dharma is your unique vibration in this universe. It is the intersection of what you love, what you are good at, and what serves the world. Reflect: What action today would make you feel most aligned with your highest self?";
    } else if (input.includes("mantra") || input.includes("chanting")) {
      response = "Mantras are sacred sound frequencies that transform the mind. The 'Gayatri Mantra' is for wisdom, 'Om Namah Shivaya' for inner transformation, and 'Maha Mrityunjaya' for healing. Which energy do you feel you need most today?";
    } else if (input.includes("yoga") || input.includes("asana")) {
      response = "Yoga is the journey of the self, through the self, to the self. While the body performs the asanas, the mind should remain equanimous. Are you breathing through your practice, or just moving your muscles?";
    } else if (input.includes("morning") || input.includes("routine")) {
      response = "The 'Brahma Muhurta' (pre-dawn) is the most auspicious time for spiritual growth. A simple routine of gratitude, a quick mantra, and 10 minutes of silence can set the tone for your entire day. Check our 'Morning Routine' section for guidance.";
    } else {
      response = "I hear you. In the journey of the soul, every question is a step toward the light. As your Bhava guide, I encourage you to look within. What does your inner silence tell you about this? Perhaps a period of reflection in our 'Meditation' zone would bring clarity.";
    }

    // ⏳ Premium "thinking" delay using a Promise
    await new Promise(resolve => setTimeout(resolve, 800));

    // Return the response
    return res.status(200).json({
      success: true,
      data: {
        reply: response,
        role: "assistant",
        timestamp: new Date().toISOString()
      }
    });

  } catch (err) {
    console.error("AI Error:", err);
    res.status(500).json({ success: false, message: "The spiritual guide is resting. Please try again soon." });
  }
};
