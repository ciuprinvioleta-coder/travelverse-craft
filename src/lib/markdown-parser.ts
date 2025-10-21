/**
 * Simple frontmatter parser for markdown files
 * Handles nested YAML objects like bestTime
 */

export interface ParsedMarkdown {
  frontmatter: Record<string, any>;
  content: string;
}

export function parseMarkdown(text: string): ParsedMarkdown {
  // Match frontmatter between --- delimiters
  const frontmatterMatch = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  
  if (!frontmatterMatch) {
    throw new Error("Invalid markdown format: frontmatter not found");
  }

  const [, frontmatterText, content] = frontmatterMatch;
  const frontmatter: Record<string, any> = {};
  
  // Parse frontmatter line by line
  const lines = frontmatterText.split("\n");
  let i = 0;
  
  while (i < lines.length) {
    const line = lines[i].trim();
    
    // Skip empty lines
    if (!line) {
      i++;
      continue;
    }
    
    // Check if this is a key-value line
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) {
      i++;
      continue;
    }
    
    const key = line.substring(0, colonIndex).trim();
    const valueText = line.substring(colonIndex + 1).trim();
    
    // Handle different value types
    if (!valueText) {
      // Empty value means nested object
      const nestedObj: Record<string, any> = {};
      i++;
      
      // Parse nested lines
      while (i < lines.length) {
        const nestedLine = lines[i].trim();
        
        // Check if we're still in the nested object
        if (!nestedLine || (!nestedLine.startsWith(" ") && nestedLine.includes(":"))) {
          break;
        }
        
        const nestedColonIndex = nestedLine.indexOf(":");
        if (nestedColonIndex !== -1) {
          const nestedKey = nestedLine.substring(0, nestedColonIndex).trim();
          const nestedValue = nestedLine.substring(nestedColonIndex + 1).trim();
          nestedObj[nestedKey] = cleanValue(nestedValue);
        }
        i++;
      }
      
      frontmatter[key] = nestedObj;
      continue;
    }
    
    // Handle array values
    if (valueText.startsWith("[")) {
      frontmatter[key] = valueText
        .replace(/^\[|\]$/g, "")
        .split(",")
        .map((item) => cleanValue(item));
    }
    // Handle boolean values
    else if (valueText === "true" || valueText === "false") {
      frontmatter[key] = valueText === "true";
    }
    // Handle string values
    else {
      frontmatter[key] = cleanValue(valueText);
    }
    
    i++;
  }
  
  return { frontmatter, content };
}

/**
 * Clean quotes and extra whitespace from values
 */
function cleanValue(value: string): string {
  return value.trim().replace(/^["']|["']$/g, "");
}
