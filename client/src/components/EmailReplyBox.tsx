import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, X, Paperclip, Smile } from "lucide-react";
import { useState } from "react";

interface EmailReplyBoxProps {
  onSend?: (message: string) => void;
  onCancel?: () => void;
  placeholder?: string;
  defaultValue?: string;
}

export default function EmailReplyBox({
  onSend,
  onCancel,
  placeholder = "Type your reply...",
  defaultValue = "",
}: EmailReplyBoxProps) {
  const [message, setMessage] = useState(defaultValue);

  const handleSend = () => {
    if (message.trim()) {
      onSend?.(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-border bg-background p-4" data-testid="reply-box">
      <div className="mb-3">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="min-h-[120px] resize-none focus-visible:ring-1"
          data-testid="textarea-reply"
        />
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" className="gap-2" data-testid="button-attach">
            <Paperclip className="h-4 w-4" />
            <span className="hidden sm:inline">Attach</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-2" data-testid="button-emoji">
            <Smile className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-2">
          {onCancel && (
            <Button variant="ghost" onClick={onCancel} data-testid="button-cancel-reply">
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          )}
          <Button
            onClick={handleSend}
            disabled={!message.trim()}
            className="gap-2 shadow-sm"
            data-testid="button-send"
          >
            <Send className="h-4 w-4" />
            Send
            <span className="text-xs text-primary-foreground/70 ml-1 hidden sm:inline">
              (Ctrl+Enter)
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
