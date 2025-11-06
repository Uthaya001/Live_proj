import EmailCategoryBadge from '../EmailCategoryBadge';

export default function EmailCategoryBadgeExample() {
  return (
    <div className="flex flex-wrap gap-2 p-4">
      <EmailCategoryBadge category="Interested" />
      <EmailCategoryBadge category="Meeting Booked" />
      <EmailCategoryBadge category="Not Interested" />
      <EmailCategoryBadge category="Spam" />
      <EmailCategoryBadge category="Out of Office" />
    </div>
  );
}
