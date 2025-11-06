import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Reply, Forward, MoreVertical, Star, Trash2 } from "lucide-react";
import EmailCategoryBadge, { type EmailCategory } from "./EmailCategoryBadge";
import AiReplySuggestion from "./AiReplySuggestion";

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
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex flex-col h-full bg-background" data-testid="panel-email-detail">
      <div className="p-6 border-b border-border">
        <div className="flex items-start justify-between mb-4 gap-4">
          <h2 className="text-2xl font-semibold flex-1" data-testid="text-email-subject">
            {subject}
          </h2>
          <div className="flex gap-1 flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleStar}
              data-testid="button-star"
            >
              <Star className={`h-4 w-4 ${isStarred ? "fill-yellow-400 text-yellow-400" : ""}`} />
            </Button>
            <Button variant="ghost" size="icon" data-testid="button-more">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {getInitials(fromName || from)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-sm" data-testid="text-sender-name">
              {fromName || from}
            </div>
            <div className="text-xs text-muted-foreground font-mono truncate" data-testid="text-sender-email">
              {from}
            </div>
          </div>
          {category && <EmailCategoryBadge category={category} />}
        </div>

        <div className="text-xs text-muted-foreground space-y-1">
          <div>
            <span className="font-medium">To:</span> {to}
          </div>
          <div data-testid="text-received-time">
            {formatDistanceToNow(receivedAt, { addSuffix: true })}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="prose prose-sm max-w-none dark:prose-invert" data-testid="text-email-body">
          {body.split("\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {aiSuggestedReply && (
          <div className="mt-6">
            <AiReplySuggestion
              suggestedReply={aiSuggestedReply}
              onUse={onUseAiReply}
              onRegenerate={onRegenerateAiReply}
            />
          </div>
        )}
      </div>

      <div className="p-4 border-t border-border bg-card">
        <div className="flex gap-2 flex-wrap">
          <Button onClick={onReply} className="gap-2" data-testid="button-reply">
            <Reply className="h-4 w-4" />
            Reply
          </Button>
          <Button variant="outline" onClick={onForward} className="gap-2" data-testid="button-forward">
            <Forward className="h-4 w-4" />
            Forward
          </Button>
          <Button variant="ghost" onClick={onDelete} className="gap-2 ml-auto" data-testid="button-delete">
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
