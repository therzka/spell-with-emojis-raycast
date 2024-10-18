import { ActionPanel, Form, Action, showToast, Toast, Clipboard } from "@raycast/api";
import { useState, useEffect} from "react";

function wrapTextWithEmoji(text: string, emojiSet: string): string {
  return text
    .split("")
    .map((char) => char !== " " ? `:${emojiSet}-${char}:` : char)
    .join("");
}

const emojiSets = [
  { value: "cake-letter", title: "Cake Letters" },
  { value: "neon-letter", title: "Neon Letters" },
  { value: "plasma-letter", title: "Plasma Letters" },
  { value: "cookie-letter", title: "Cookie Letters" },
  { value: "neon-block-letter", title: "Neon Block Letters" },
  { value: "hellokitty-letter", title: "Hello Kitty Letters" },
  { value: "alphabet-white", title: "Alphabet White Letters" },
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
          <Action.Paste title="Paste text" content={wrappedText} />
          <Action.CopyToClipboard title="Copy to Clipboard" content={wrappedText} />
        </ActionPanel>
      }
    >
      <Form.TextField id="text" title="Text" value={text} onChange={setText} />
      <Form.Dropdown id="emojiSet" title="Emoji Set" value={emojiSet} onChange={setEmojiSet}>
        {emojiSets.map((set) => (
          <Form.Dropdown.Item key={set.value} value={set.value} title={set.title} />
        ))}
      </Form.Dropdown>
    </Form>
  );
}

export default Command;
