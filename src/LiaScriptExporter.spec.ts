import { LiaScriptExporter } from "./LiaScriptExporter";

describe("addPage", () => {
  let lia: LiaScriptExporter;

  beforeEach(() => {
    lia = new LiaScriptExporter();
  });

  it("New Page Title; 1 Subtitle", () => {
    lia.addPage(["Page Title"], "# Title\n\n## Subtitle\n\nText");
    const expected = `# Page Title

<section>

## Title

<section>

### Subtitle

Text

</section>

</section>
`;
    expect(lia.buildPage()).toEqual(expected);
  });

  it("New Page Title + Sub Page Title; 1 Subtitle", () => {
    lia.addPage(
      ["Page Title", "Sub Page Title"],
      "# Title\n\n## Subtitle\n\nText"
    );
    const expected = `# Page Title

## Sub Page Title

<section>

### Title

<section>

#### Subtitle

Text

</section>

</section>
`;
    expect(lia.buildPage()).toEqual(expected);
  });
});
