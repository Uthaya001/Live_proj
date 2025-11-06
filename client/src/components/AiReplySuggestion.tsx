import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, RefreshCw, Copy, Check } from "lucide-react";
import { useState } from "react";

interface AiReplySuggestionProps {
  suggestedReply: string;
  onUse?: (reply: string) => void;
  onRegenerate?: () => void;
  isLoading?: boolean;
}

export default function AiReplySuggestion({
  suggestedReply,
  onUse,
  onRegenerate,
  isLoading = false,
}: AiReplySuggestionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(suggestedReply);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800" data-testid="card-ai-suggestion">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <h4 className="font-semibold text-sm text-foreground">AI Suggested Reply</h4>
      </div>

      <div className="bg-background border border-blue-200 dark:border-blue-800 rounded-md p-3 mb-3 border-l-4 border-l-primary">
        <p className="text-sm text-foreground whitespace-pre-wrap" data-testid="text-suggested-reply">
          {isLoading ? "Generating AI reply..." : suggestedReply}
        </p>
      </div>

      <div className="flex gap-2 flex-wrap">
        <Button
          onClick={() => onUse?.(suggestedReply)}
          disabled={isLoading}
          className="gap-2"
          data-testid="button-use-reply"
        >
          <Check className="h-4 w-4" />
          Use This Reply
        </Button>
        <Button
          variant="outline"
          onClick={onRegenerate}
          disabled={isLoading}
          className="gap-2"
          data-testid="button-regenerate"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          Regenerate
        </Button>
        <Button
          variant="ghost"
          onClick={handleCopy}
          className="gap-2"
          data-testid="button-copy"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>
    </Card>
  );
}
