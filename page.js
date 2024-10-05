// Function to swap words incorrectly
function swapWords(textNode) {
    let text = textNode.nodeValue;
  
    // Perform replacements with wrong versions of the words
    text = text.replace(/\bthere\b/g, "their");
    text = text.replace(/\btheir\b/g, "they're");
    text = text.replace(/\bthey're\b/g, "there");
  
    textNode.nodeValue = text;
  }
  
  // Walk the DOM tree and replace text in text nodes
  function walk(node) {
    // Only process text nodes (nodeType 3)
    if (node.nodeType === 3) {
        swapWords(node);
    } else {
        let child = node.firstChild;
        while (child) {
            walk(child);
            child = child.nextSibling;
        }
    }
  }
  
  // Start the process from the body of the document
  walk(document.body);