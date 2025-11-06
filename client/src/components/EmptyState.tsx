import emptyInboxImage from "@assets/generated_images/Empty_inbox_illustration_2b030456.png";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export default function EmptyState({
  title = "No emails",
  description = "Your inbox is empty or no emails match your current filters.",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8" data-testid="empty-state">
      <div className="max-w-md w-full">
        <img
          src={emptyInboxImage}
          alt="Empty inbox"
          className="w-64 h-64 mx-auto mb-6 opacity-90"
          data-testid="img-empty-state"
        />
        <h3 className="text-xl font-semibold text-center mb-2" data-testid="text-empty-title">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground text-center" data-testid="text-empty-description">
          {description}
        </p>
      </div>
    </div>
  );
}
