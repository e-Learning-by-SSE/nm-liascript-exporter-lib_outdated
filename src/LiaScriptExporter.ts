export class LiaScriptExporter {
  private pages: string[] = [];

  public addPage(pageTitles: string[], md: string) {
    const lines = md.split(/\r?\n/);
    const result: string[] = [];

    pageTitles.forEach((pageTitle, index) => {
      result.push(`${"#".repeat(index + 1)} ${pageTitle}\n\n`);
    });
    // We added an extra line, remove it
    let lastLine = result.pop();
    if (lastLine) {
      result.push(lastLine.slice(0, -1));
    }

    let currentLevel = 0;
    let previousLevel = 0;

    for (const line of lines) {
      const match = line.match(/^(\#{1,6})\s(.*)$/);
      if (match) {
        const level = match[1].length;
        const title = match[2];

        currentLevel = level;
        if (level === previousLevel + 1) {
          // Same title level as before: Add one closing section tag
          const prevLine = result[result.length - 1];
          if (prevLine !== "\n" && prevLine !== "") {
            result.push("\n");
          }
          result.push("<section>\n\n");
        } else if (level <= previousLevel) {
          // Higher level than before: Close all previous sections
          const prevLine = result[result.length - 1];
          if (prevLine !== "\n" && prevLine !== "") {
            result.push("\n");
          }
          result.push(`</section>\n\n`.repeat(previousLevel - level + 1));
        }

        // Convert the title: Add one #
        result.push(`${"#".repeat(level + pageTitles.length)} ${title}\n`);
        previousLevel = level;
      } else {
        result.push(`${line}\n`);
      }
    }

    // Close all remaining sections ad the end of the page
    if (currentLevel > 0) {
      const prevLine = result[result.length - 1];
      if (prevLine !== "\n" && prevLine !== "") {
        result.push("\n");
      }
      result.push(`</section>\n\n`.repeat(currentLevel));
    }

    // We added an extra line at the end of the file, remove it
    lastLine = result.pop();
    if (lastLine) {
      result.push(lastLine.slice(0, -1));
    }

    this.pages.push(result.join(""));
  }
  public buildPage() {
    return this.pages.join("\n");
  }
}
