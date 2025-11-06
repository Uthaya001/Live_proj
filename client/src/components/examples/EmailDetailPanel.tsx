import EmailDetailPanel from '../EmailDetailPanel';

export default function EmailDetailPanelExample() {
  return (
    <div className="h-screen">
      <EmailDetailPanel
        from="hiring@techcorp.com"
        fromName="Sarah Johnson"
        to="me@example.com"
        subject="RE: Software Engineer Position - Interview Invitation"
        body={`Hi there,

Thank you for applying to our Software Engineer position. We were impressed with your background and would like to invite you for a technical interview.

Would you be available for a 1-hour video call next week? We're flexible with timing and can work around your schedule.

Looking forward to hearing from you!

Best regards,
Sarah Johnson
Senior Technical Recruiter
TechCorp Inc.`}
        receivedAt={new Date(Date.now() - 1000 * 60 * 45)}
        category="Interested"
        isStarred={true}
        aiSuggestedReply="Thank you for shortlisting my profile! I'm available for a technical interview. You can book a slot here: https://cal.com/example"
        onReply={() => console.log('Reply clicked')}
        onForward={() => console.log('Forward clicked')}
        onDelete={() => console.log('Delete clicked')}
        onToggleStar={() => console.log('Toggle star')}
        onUseAiReply={(reply) => console.log('Using AI reply:', reply)}
        onRegenerateAiReply={() => console.log('Regenerating AI reply')}
      />
    </div>
  );
}
