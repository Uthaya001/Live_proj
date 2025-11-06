import EmailListItem from '../EmailListItem';
import { useState } from 'react';

export default function EmailListItemExample() {
  const [selected, setSelected] = useState(false);

  return (
    <div className="max-w-3xl">
      <EmailListItem
        id="1"
        from="john@example.com"
        fromName="John Doe"
        subject="RE: Job Application Follow-up"
        preview="Thank you for your interest in our company. We would like to schedule an interview..."
        receivedAt={new Date(Date.now() - 1000 * 60 * 30)}
        isRead={false}
        isStarred={true}
        category="Interested"
        isSelected={selected}
        onClick={() => console.log('Email clicked')}
        onToggleSelect={setSelected}
      />
    </div>
  );
}
