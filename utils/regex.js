// регулярное выражение (regex) для проверки корректности URL-адреса.
const linkRegex = /^https?:\/\/(www\.)?[0-9a-zA-Z]+([.|-]{1}[0-9a-zA-Z]+)*\.[0-9a-zA-Z-]+(\/[0-9a-zA-Z\-._~:/?#[\]@!$&'()*+,;=]*#?)?$/;
const linkImageRegex = /^https?:\/\/(www\.)?[a-zA-Z0-9-.]+\.[a-z]{2,}\/[\S]+\.(png|jpg|jpeg)/;
module.exports = {
  linkRegex,
  linkImageRegex,
};
