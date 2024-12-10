import { ActionPanel, Form, Action, Icon } from "@raycast/api";
import { useState, useEffect } from "react";

function wrapTextWithEmoji(text: string, emojiSet: string): string {
  return text
    .split("")
    .map((char) => {
      if (char === " ") return "   ";
      if (emojiSet !== "ransom-note") return `:${emojiSet}-${char}:`;

      const randomEmojiSetIndex = Math.floor(Math.random() * emojiSets.length);
      return `:${emojiSets[randomEmojiSetIndex].value}-${char}:`;
    })
    .join("");
}

const emojiSets = [
  { value: "neon-letter", title: "Neon", icon: "neon-letter-a.gif" },
  {
    value: "plasma-letter",
    title: "Plasma",
    icon: "plasma-letter-a.gif",
  },
  {
    value: "dancing-letter",
    title: "Dancing",
    icon: "dancing-letter-a.gif",
  },
  {
    value: "magazine-letter",
    title: "Magazine",
    icon: "magazine-letter-a.png",
  },
  { value: "cake-letter", title: "Cake", icon: "cake-letter-a.gif" },
  {
    value: "keyboard-letter",
    title: "Keyboard",
    icon: "keyboard-letter-a.png",
  },
  {
    value: "cookie-letter",
    title: "Cookie",
    icon: "cookie-letter-a.png",
  },
  {
    value: "neon-block-letter",
    title: "Neon Block",
    icon: "neon-block-letter-a.gif",
  },
  {
    value: "hellokitty-letter",
    title: "Hello Kitty",
    icon: "hellokitty-letter-a.png",
  },
  {
    value: "sega-letter",
    title: "Sega",
    icon: "sega-letter-a.gif",
  },
  {
    value: "sonic-letter",
    title: "Sonic",
    icon: "sonic-letter-a.png",
  },
  {
    value: "alphabet-white",
    title: "Alphabet White",
    icon: "alphabet-white-a.png",
  },
  {
    value: "alphabet-yellow",
    title: "Alphabet Yellow",
    icon: "alphabet-yellow-a.png",
  },
  {
    value: "fww",
    title: "Fireworks Black",
    icon: "fww-a.gif",
  },
  {
    value: "fwb",
    title: "Fireworks White",
    icon: "fwb-a.gif",
  },
  {
    value: "c64",
    title: "Commodore 64",
    icon: "c64-a.png",
  },
  {
    value: "cs",
    title: "Comic Sans",
    icon: "cs-a.png",
  },
  {
    value: "scrabble",
    title: "Scrabble Tiles",
    icon: "a-scrabble.jpg",
  },
] as const;
const emojiOptions = [
  ...emojiSets,
  {
    value: "ransom-note",
    title: "Ransom note mode (random)",
    icon: Icon.Shuffle,
  },
] as const;

function Command() {
  const [text, setText] = useState("");
  const [emojiSet, setEmojiSet] = useState("");
  const [wrappedText, setWrappedText] = useState("");

  useEffect(() => {
    const wrapped = wrapTextWithEmoji(text, emojiSet);
    setWrappedText(wrapped);
  }, [text, emojiSet]);

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.Paste
            title="Paste"
            content={wrappedText}
            shortcut={{ key: "enter", modifiers: ["shift"] }}
          />
          <Action.CopyToClipboard
            title="Copy to Clipboard"
            content={wrappedText}
          />
        </ActionPanel>
      }
    >
      <Form.TextField id="text" title="Text" value={text} onChange={setText} />
      <Form.Dropdown
        id="emojiSet"
        title="Emoji Set"
        value={emojiSet}
        onChange={setEmojiSet}
      >
        {emojiOptions.map((set) => (
          <Form.Dropdown.Item
            key={set.value}
            value={set.value}
            title={set.title}
            icon={{ source: set.icon }}
          />
        ))}
      </Form.Dropdown>
    </Form>
  );
}

export default Command;
