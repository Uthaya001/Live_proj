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
    <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-b from-background to-muted/20" data-testid="empty-state">
      <div className="max-w-md w-full">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-20 blur-3xl rounded-full" />
          <img
            src={emptyInboxImage}
            alt="Empty inbox"
            className="w-72 h-72 mx-auto mb-8 opacity-90 relative z-10"
            data-testid="img-empty-state"
          />
        </div>
        <h3 className="text-2xl font-bold text-center mb-3 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text" data-testid="text-empty-title">
          {title}
        </h3>
        <p className="text-base text-muted-foreground text-center leading-relaxed" data-testid="text-empty-description">
          {description}
        </p>
      </div>
    </div>
  );
}
