import AiReplySuggestion from '../AiReplySuggestion';

export default function AiReplySuggestionExample() {
  return (
    <div className="max-w-2xl p-4">
      <AiReplySuggestion
        suggestedReply="Thank you for shortlisting my profile! I'm available for a technical interview. You can book a slot here: https://cal.com/example"
        onUse={(reply) => console.log('Using reply:', reply)}
        onRegenerate={() => console.log('Regenerating...')}
      />
    </div>
  );
}
