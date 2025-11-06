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
      className={`group relative flex gap-3 border-b border-border p-4 hover-elevate cursor-pointer ${
        !isRead ? "bg-blue-50/30 dark:bg-blue-950/10" : ""
      } ${isSelected ? "bg-accent/50" : ""}`}
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
        className="mt-1 h-4 w-4 rounded border-input"
        data-testid={`checkbox-email-${id}`}
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              {!isRead && (
                <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0" data-testid="indicator-unread" />
              )}
              <span className={`font-medium text-sm truncate ${!isRead ? "text-foreground" : "text-muted-foreground"}`}>
                {fromName || from}
              </span>
            </div>
            {isStarred && (
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 flex-shrink-0" data-testid="icon-starred" />
            )}
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xs text-muted-foreground" data-testid={`text-time-${id}`}>
              {formatDistanceToNow(receivedAt, { addSuffix: true })}
            </span>
          </div>
        </div>

        <div className="mb-1">
          <h3 className={`text-base truncate ${!isRead ? "font-medium" : "font-normal"}`} data-testid={`text-subject-${id}`}>
            {subject}
          </h3>
        </div>

        <div className="flex items-center justify-between gap-2">
          <p className="text-sm text-muted-foreground line-clamp-2 flex-1" data-testid={`text-preview-${id}`}>
            {preview}
          </p>
          {category && <EmailCategoryBadge category={category} />}
        </div>
      </div>
    </div>
  );
}
