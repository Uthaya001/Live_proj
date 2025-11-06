import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Calendar, XCircle, AlertCircle, Coffee } from "lucide-react";

export type EmailCategory = "Interested" | "Meeting Booked" | "Not Interested" | "Spam" | "Out of Office" | null;

interface EmailCategoryBadgeProps {
  category: EmailCategory;
  className?: string;
}

const categoryConfig = {
  "Interested": {
    icon: CheckCircle2,
    className: "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
  },
  "Meeting Booked": {
    icon: Calendar,
    className: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800",
  },
  "Not Interested": {
    icon: XCircle,
    className: "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800/30 dark:text-gray-400 dark:border-gray-700",
  },
  "Spam": {
    icon: AlertCircle,
    className: "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800",
  },
  "Out of Office": {
    icon: Coffee,
    className: "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800",
  },
};

export default function EmailCategoryBadge({ category, className = "" }: EmailCategoryBadgeProps) {
  if (!category) return null;

  const config = categoryConfig[category];
  const Icon = config.icon;

  return (
    <Badge
      variant="outline"
      className={`gap-1 text-xs font-medium ${config.className} ${className}`}
      data-testid={`badge-category-${category.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <Icon className="h-3 w-3" />
      <span className="uppercase tracking-wide">{category}</span>
    </Badge>
  );
}
