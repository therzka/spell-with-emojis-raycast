import { ActionPanel, Form, Action, useNavigation, showToast, Toast } from "@raycast/api";
import { useState } from "react";

function wrapTextWithEmoji(text: string, emojiSet: string): string {
  const emojiPrefix = `:${emojiSet}-letter-`;
  const emojiSuffix = `:`;
  return text
    .split("")
    .map((char) => `${emojiPrefix}${char}${emojiSuffix}`)
    .join("");
}

function Command() {
  const [text, setText] = useState("");
  const [emojiSet, setEmojiSet] = useState("letter");

  const handleCopy = async () => {
    const wrappedText = wrapTextWithEmoji(text, emojiSet);
    await navigator.clipboard.writeText(wrappedText);
    showToast(Toast.Style.Success, "Copied to clipboard");
  };

  return (
    <Form
      actions={
        <ActionPanel>
          <Action title="Copy to Clipboard" onAction={handleCopy} />
        </ActionPanel>
      }
    >
      <Form.TextField id="text" title="Text" value={text} onChange={setText} />
      <Form.Dropdown id="emojiSet" title="Emoji Set" value={emojiSet} onChange={setEmojiSet}>
        <Form.Dropdown.Item value="letter" title="Letter" />
        <Form.Dropdown.Item value="cake-letter" title="Cake Letter" />
        <Form.Dropdown.Item value="neon-letter" title="Neon Letter" />
      </Form.Dropdown>
    </Form>
  );
}

export default Command;
