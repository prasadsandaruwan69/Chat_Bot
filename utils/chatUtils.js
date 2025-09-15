export const formatTime = (date) => {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const generateMessageId = () => {
  return Date.now() + Math.random();
};

export const createMessage = (text, sender) => {
  return {
    id: generateMessageId(),
    text,
    sender,
    timestamp: new Date().toISOString(),
  };
};
