import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Reply, Forward, MoreVertical, Star, Trash2 } from "lucide-react";
import EmailCategoryBadge, { type EmailCategory } from "./EmailCategoryBadge";
import AiReplySuggestion from "./AiReplySuggestion";
import EmailReplyBox from "./EmailReplyBox";
import { useState } from "react";

interface EmailDetailPanelProps {
  from: string;
  fromName?: string;
  to: string;
  subject: string;
  body: string;
  receivedAt: Date;
  category?: EmailCategory;
  isStarred?: boolean;
  aiSuggestedReply?: string;
  onReply?: () => void;
  onForward?: () => void;
  onDelete?: () => void;
  onToggleStar?: () => void;
  onUseAiReply?: (reply: string) => void;
  onRegenerateAiReply?: () => void;
}

export default function EmailDetailPanel({
  from,
  fromName,
  to,
  subject,
  body,
  receivedAt,
  category,
  isStarred,
  aiSuggestedReply,
  onReply,
  onForward,
  onDelete,
  onToggleStar,
  onUseAiReply,
  onRegenerateAiReply,
}: EmailDetailPanelProps) {
  const [showReplyBox, setShowReplyBox] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleReplyClick = () => {
    setShowReplyBox(true);
    onReply?.();
  };

  const handleSendReply = (message: string) => {
    console.log("Sending reply:", message);
    setShowReplyBox(false);
  };

  const handleUseAiReply = (reply: string) => {
    setShowReplyBox(true);
    onUseAiReply?.(reply);
  };

  return (
    <div className="flex flex-col h-full bg-background" data-testid="panel-email-detail">
      <div className="p-6 border-b border-border bg-card/30">
        <div className="flex items-start justify-between mb-6 gap-4">
          <h2 className="text-xl font-semibold flex-1 leading-tight" data-testid="text-email-subject">
            {subject}
          </h2>
          <div className="flex gap-1 flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleStar}
              data-testid="button-star"
            >
              <Star className={`h-4 w-4 ${isStarred ? "fill-yellow-500 text-yellow-500" : ""}`} />
            </Button>
            <Button variant="ghost" size="icon" data-testid="button-more">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <Avatar className="h-12 w-12 ring-2 ring-border">
            <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-semibold">
              {getInitials(fromName || from)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-base mb-0.5" data-testid="text-sender-name">
              {fromName || from}
            </div>
            <div className="text-xs text-muted-foreground font-mono truncate" data-testid="text-sender-email">
              {from}
            </div>
          </div>
          {category && <EmailCategoryBadge category={category} />}
        </div>

        <div className="text-xs text-muted-foreground space-y-1.5 bg-muted/30 rounded-md p-3">
          <div>
            <span className="font-semibold text-foreground">To:</span> <span className="font-mono">{to}</span>
          </div>
          <div data-testid="text-received-time">
            <span className="font-semibold text-foreground">Received:</span> {formatDistanceToNow(receivedAt, { addSuffix: true })}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 bg-muted/10">
        <div className="prose prose-sm max-w-none dark:prose-invert bg-background rounded-lg p-6 shadow-sm border border-border" data-testid="text-email-body">
          {body.split("\n").map((paragraph, i) => (
            <p key={i} className="leading-relaxed">{paragraph}</p>
          ))}
        </div>

        {aiSuggestedReply && !showReplyBox && (
          <div className="mt-6">
            <AiReplySuggestion
              suggestedReply={aiSuggestedReply}
              onUse={handleUseAiReply}
              onRegenerate={onRegenerateAiReply}
            />
          </div>
        )}
      </div>

      {showReplyBox ? (
        <EmailReplyBox
          onSend={handleSendReply}
          onCancel={() => setShowReplyBox(false)}
          defaultValue={showReplyBox && aiSuggestedReply ? aiSuggestedReply : ""}
        />
      ) : (
        <div className="p-4 border-t border-border bg-card/50 backdrop-blur-sm">
          <div className="flex gap-2 flex-wrap">
            <Button onClick={handleReplyClick} className="gap-2 shadow-sm" data-testid="button-reply">
              <Reply className="h-4 w-4" />
              Reply
            </Button>
            <Button variant="outline" onClick={onForward} className="gap-2" data-testid="button-forward">
              <Forward className="h-4 w-4" />
              Forward
            </Button>
            <Button variant="ghost" onClick={onDelete} className="gap-2 ml-auto text-destructive hover:text-destructive" data-testid="button-delete">
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
