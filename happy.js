// Function to swap negative words to positive ones
function swapWords(textNode) {
    let text = textNode.nodeValue;

    // Replace negative words with positive versions
    text = text.replace(/\bbad\b/g, "good");
    text = text.replace(/\bterrible\b/g, "great");
    text = text.replace(/\bsad\b/g, "happy");
    text = text.replace(/\bawful\b/g, "amazing");
    text = text.replace(/\bhate\b/g, "love");
    text = text.replace(/\bboring\b/g, "exciting");

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