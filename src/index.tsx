import { ActionPanel, Form, Action } from "@raycast/api";
import { useState, useEffect } from "react";

function wrapTextWithEmoji(text: string, emojiSet: string): string {
  return text
    .split("")
    .map((char) => (char !== " " ? `:${emojiSet}-${char}:` : char))
    .join("");
}

const emojiSets = [
  { value: "neon-letter", title: "Neon Letters", icon: "neon-letter-a.gif" },
  {
    value: "plasma-letter",
    title: "Plasma Letters",
    icon: "plasma-letter-a.gif",
  },
  { value: "cake-letter", title: "Cake Letters", icon: "cake-letter-a.gif" },
  {
    value: "keyboard-letter",
    title: "Keyboard Letters",
    icon: "keyboard-letter-a.png",
  },
  {
    value: "cookie-letter",
    title: "Cookie Letters",
    icon: "cookie-letter-a.png",
  },
  {
    value: "neon-block-letter",
    title: "Neon Block Letters",
    icon: "neon-block-letter-a.gif",
  },
  {
    value: "hellokitty-letter",
    title: "Hello Kitty Letters",
    icon: "hellokitty-letter-a.png",
  },
  {
    value: "alphabet-white",
    title: "Alphabet White Letters",
    icon: "alphabet-white-a.png",
  },
];

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
        {emojiSets.map((set) => (
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
