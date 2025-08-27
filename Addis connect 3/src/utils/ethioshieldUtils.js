export function checkHeuristics(url) {
    let score = 0;
    let reasons = [];
  
    // suspicious TLDs lol
    const badTlds = [".ru", ".tk", ".xyz", ".top", ".club"];
    if (badTlds.some(tld => url.endsWith(tld))) {
      score += 40;
      reasons.push("Suspicious top-level domain");
    }
  
    // common phishing keywords 
    const badWords = ["login", "verify", "update", "secure", "account", "bank", "paypal"];
    if (badWords.some(word => url.toLowerCase().includes(word))) {
      score += 30;
      reasons.push("Contains sensitive keyword");
    }
  
    // unusual length
    if (url.length > 60) {
      score += 20;
      reasons.push("Unusually long URL");
    }
  
    // http not https
    if (url.startsWith("http://")) {
      score += 10;
      reasons.push("Not using HTTPS");
    }
  
    // clamp score
    if (score > 100) score = 100;
  
    return { score, reasons };
  }
  