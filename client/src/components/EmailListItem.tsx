import { formatDistanceToNow } from "date-fns";
import { Mail, Star } from "lucide-react";
import EmailCategoryBadge, { type EmailCategory } from "./EmailCategoryBadge";

interface EmailListItemProps {
  id: string;
  from: string;
  fromName?: string;
  subject: string;
  preview: string;
  receivedAt: Date;
  isRead: boolean;
  isStarred?: boolean;
  category?: EmailCategory;
  isSelected?: boolean;
  onClick?: () => void;
  onToggleSelect?: (checked: boolean) => void;
}

export default function EmailListItem({
  id,
  from,
  fromName,
  subject,
  preview,
  receivedAt,
  isRead,
  isStarred,
  category,
  isSelected,
  onClick,
  onToggleSelect,
}: EmailListItemProps) {
  return (
    <div
      className={`group relative flex gap-4 border-b border-border p-4 hover-elevate cursor-pointer transition-colors ${
        !isRead ? "bg-blue-50/40 dark:bg-blue-950/20" : ""
      } ${isSelected ? "bg-accent/60" : ""}`}
      onClick={onClick}
      data-testid={`email-item-${id}`}
    >
      <input
        type="checkbox"
        checked={isSelected}
        onChange={(e) => {
          e.stopPropagation();
          onToggleSelect?.(e.target.checked);
        }}
        className="mt-1.5 h-4 w-4 rounded border-input"
        data-testid={`checkbox-email-${id}`}
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            {!isRead && (
              <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0" data-testid="indicator-unread" />
            )}
            <span className={`font-semibold text-sm truncate ${!isRead ? "text-foreground" : "text-muted-foreground"}`}>
              {fromName || from}
            </span>
            {isStarred && (
              <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500 flex-shrink-0" data-testid="icon-starred" />
            )}
          </div>
          <span className="text-xs text-muted-foreground whitespace-nowrap" data-testid={`text-time-${id}`}>
            {formatDistanceToNow(receivedAt, { addSuffix: true })}
          </span>
        </div>

        <div className="mb-2">
          <h3 className={`text-sm truncate ${!isRead ? "font-semibold text-foreground" : "font-medium text-foreground"}`} data-testid={`text-subject-${id}`}>
            {subject}
          </h3>
        </div>

        <div className="flex items-start justify-between gap-3">
          <p className="text-sm text-muted-foreground line-clamp-2 flex-1" data-testid={`text-preview-${id}`}>
            {preview}
          </p>
          {category && <EmailCategoryBadge category={category} className="flex-shrink-0" />}
        </div>
      </div>
    </div>
  );
}
