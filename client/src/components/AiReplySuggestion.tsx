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
    <Card className="p-5 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30 border-2 border-blue-200 dark:border-blue-800 shadow-md" data-testid="card-ai-suggestion">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 bg-blue-600 dark:bg-blue-500 rounded-md">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <h4 className="font-bold text-base text-foreground">AI Suggested Reply</h4>
        <div className="ml-auto px-2 py-0.5 bg-blue-600 dark:bg-blue-500 text-white text-xs font-semibold rounded-full">
          RAG Powered
        </div>
      </div>

      <div className="bg-background border-2 border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4 border-l-4 border-l-primary shadow-sm">
        <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed" data-testid="text-suggested-reply">
          {isLoading ? "Generating AI reply..." : suggestedReply}
        </p>
      </div>

      <div className="flex gap-2 flex-wrap">
        <Button
          onClick={() => onUse?.(suggestedReply)}
          disabled={isLoading}
          className="gap-2 shadow-sm font-medium"
          data-testid="button-use-reply"
        >
          <Check className="h-4 w-4" />
          Use This Reply
        </Button>
        <Button
          variant="outline"
          onClick={onRegenerate}
          disabled={isLoading}
          className="gap-2 border-2"
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
          {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>
    </Card>
  );
}
