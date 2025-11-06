import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import EmailSearchBar from "@/components/EmailSearchBar";
import EmailListItem from "@/components/EmailListItem";
import EmailDetailPanel from "@/components/EmailDetailPanel";
import EmptyState from "@/components/EmptyState";
import { Trash2, Archive, Tag } from "lucide-react";
import type { EmailCategory } from "@/components/EmailCategoryBadge";

interface MockEmail {
  id: string;
  from: string;
  fromName?: string;
  to: string;
  subject: string;
  preview: string;
  body: string;
  receivedAt: Date;
  isRead: boolean;
  isStarred?: boolean;
  category?: EmailCategory;
  folder: "primary" | "others";
}

const mockEmails: MockEmail[] = [
  {
    id: "1",
    from: "hiring@techcorp.com",
    fromName: "Sarah Johnson",
    to: "me@example.com",
    subject: "RE: Software Engineer Position - Interview Invitation",
    preview: "Thank you for applying to our Software Engineer position. We were impressed with your background...",
    body: `Hi there,

Thank you for applying to our Software Engineer position. We were impressed with your background and would like to invite you for a technical interview.

Would you be available for a 1-hour video call next week? We're flexible with timing and can work around your schedule.

Looking forward to hearing from you!

Best regards,
Sarah Johnson
Senior Technical Recruiter
TechCorp Inc.`,
    receivedAt: new Date(Date.now() - 1000 * 60 * 45),
    isRead: false,
    isStarred: true,
    category: "Interested",
    folder: "primary",
  },
  {
    id: "2",
    from: "john.smith@startup.io",
    fromName: "John Smith",
    to: "me@example.com",
    subject: "Meeting Scheduled - Product Demo Tomorrow",
    preview: "Just confirming our meeting tomorrow at 2 PM for the product demonstration...",
    body: `Hey,

Just confirming our meeting tomorrow at 2 PM for the product demonstration. I've sent you a calendar invite.

Please let me know if you need anything before the call.

Thanks,
John`,
    receivedAt: new Date(Date.now() - 1000 * 60 * 120),
    isRead: true,
    category: "Meeting Booked",
    folder: "primary",
  },
  {
    id: "3",
    from: "newsletter@marketing.com",
    fromName: "Marketing Weekly",
    to: "me@example.com",
    subject: "Your Weekly Marketing Digest",
    preview: "Top marketing trends this week, including AI automation and personalization strategies...",
    body: `This week's top stories:

1. AI in Marketing Automation
2. Personalization at Scale
3. New Social Media Algorithms

Read more at our website.`,
    receivedAt: new Date(Date.now() - 1000 * 60 * 180),
    isRead: true,
    folder: "others",
  },
  {
    id: "4",
    from: "noreply@system.com",
    fromName: "Out of Office",
    to: "me@example.com",
    subject: "Automatic reply: RE: Partnership Inquiry",
    preview: "I'm currently out of office and will return on Monday...",
    body: `Thank you for your email.

I'm currently out of office and will return on Monday, March 18th. I will have limited access to email during this time.

For urgent matters, please contact support@company.com.

Best regards,
Michael Chen`,
    receivedAt: new Date(Date.now() - 1000 * 60 * 240),
    isRead: false,
    category: "Out of Office",
    folder: "primary",
  },
  {
    id: "5",
    from: "sales@competitor.com",
    fromName: "Sales Team",
    to: "me@example.com",
    subject: "Not the right fit",
    preview: "Thanks for reaching out, but we're not interested at this time...",
    body: `Hi,

Thanks for reaching out about your product. After reviewing, we don't think it's the right fit for our current needs.

Best of luck with your business.

Regards,
Sales Team`,
    receivedAt: new Date(Date.now() - 1000 * 60 * 360),
    isRead: true,
    category: "Not Interested",
    folder: "primary",
  },
];

export default function Inbox() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmails, setSelectedEmails] = useState<Set<string>>(new Set());
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>("1");
  const [activeTab, setActiveTab] = useState<"primary" | "others">("primary");

  const filteredEmails = mockEmails.filter((email) => {
    const matchesSearch =
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.preview.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = email.folder === activeTab;
    return matchesSearch && matchesTab;
  });

  const selectedEmail = mockEmails.find((e) => e.id === selectedEmailId);

  const handleToggleSelect = (emailId: string, checked: boolean) => {
    const newSelected = new Set(selectedEmails);
    if (checked) {
      newSelected.add(emailId);
    } else {
      newSelected.delete(emailId);
    }
    setSelectedEmails(newSelected);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedEmails(new Set(filteredEmails.map((e) => e.id)));
    } else {
      setSelectedEmails(new Set());
    }
  };

  const primaryCount = mockEmails.filter((e) => e.folder === "primary").length;
  const othersCount = mockEmails.filter((e) => e.folder === "others").length;

  return (
    <div className="flex h-full">
      <div className="flex flex-col w-full lg:w-[450px] border-r border-border bg-background">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-lg font-semibold" data-testid="text-page-title">
              All Inbox(s)
            </h1>
            <span className="text-sm text-muted-foreground" data-testid="text-inbox-count">
              {selectedEmails.size > 0 ? `${selectedEmails.size} selected` : `0/${filteredEmails.length} inboxes selected`}
            </span>
          </div>

          <EmailSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onFilterClick={() => console.log("Filters clicked")}
          />
        </div>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "primary" | "others")} className="flex-1 flex flex-col">
          <div className="border-b border-border px-4">
            <TabsList className="w-full justify-start h-12 bg-transparent p-0">
              <TabsTrigger
                value="primary"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6"
                data-testid="tab-primary"
              >
                Primary ({primaryCount})
              </TabsTrigger>
              <TabsTrigger
                value="others"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6"
                data-testid="tab-others"
              >
                Others ({othersCount})
              </TabsTrigger>
            </TabsList>
          </div>

          {selectedEmails.size > 0 && (
            <div className="flex items-center gap-2 p-3 bg-accent border-b border-border">
              <Checkbox
                checked={selectedEmails.size === filteredEmails.length}
                onCheckedChange={handleSelectAll}
                data-testid="checkbox-select-all"
              />
              <span className="text-sm font-medium">{selectedEmails.size} selected</span>
              <div className="flex gap-1 ml-auto">
                <Button variant="ghost" size="sm" className="gap-2" data-testid="button-bulk-delete">
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="gap-2" data-testid="button-bulk-archive">
                  <Archive className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="gap-2" data-testid="button-bulk-tag">
                  <Tag className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          <TabsContent value="primary" className="flex-1 overflow-y-auto m-0">
            {filteredEmails.length === 0 ? (
              <EmptyState
                title="No emails found"
                description="Try adjusting your search or filters."
              />
            ) : (
              <div>
                {filteredEmails.map((email) => (
                  <EmailListItem
                    key={email.id}
                    id={email.id}
                    from={email.from}
                    fromName={email.fromName}
                    subject={email.subject}
                    preview={email.preview}
                    receivedAt={email.receivedAt}
                    isRead={email.isRead}
                    isStarred={email.isStarred}
                    category={email.category}
                    isSelected={selectedEmails.has(email.id)}
                    onClick={() => setSelectedEmailId(email.id)}
                    onToggleSelect={(checked) => handleToggleSelect(email.id, checked)}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="others" className="flex-1 overflow-y-auto m-0">
            {filteredEmails.length === 0 ? (
              <EmptyState
                title="No emails found"
                description="Try adjusting your search or filters."
              />
            ) : (
              <div>
                {filteredEmails.map((email) => (
                  <EmailListItem
                    key={email.id}
                    id={email.id}
                    from={email.from}
                    fromName={email.fromName}
                    subject={email.subject}
                    preview={email.preview}
                    receivedAt={email.receivedAt}
                    isRead={email.isRead}
                    isStarred={email.isStarred}
                    category={email.category}
                    isSelected={selectedEmails.has(email.id)}
                    onClick={() => setSelectedEmailId(email.id)}
                    onToggleSelect={(checked) => handleToggleSelect(email.id, checked)}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <div className="hidden lg:flex flex-1">
        {selectedEmail ? (
          <EmailDetailPanel
            from={selectedEmail.from}
            fromName={selectedEmail.fromName}
            to={selectedEmail.to}
            subject={selectedEmail.subject}
            body={selectedEmail.body}
            receivedAt={selectedEmail.receivedAt}
            category={selectedEmail.category}
            isStarred={selectedEmail.isStarred}
            aiSuggestedReply={
              selectedEmail.category === "Interested"
                ? "Thank you for shortlisting my profile! I'm available for a technical interview. You can book a slot here: https://cal.com/example"
                : undefined
            }
            onReply={() => console.log("Reply")}
            onForward={() => console.log("Forward")}
            onDelete={() => console.log("Delete")}
            onToggleStar={() => console.log("Toggle star")}
            onUseAiReply={(reply) => console.log("Using AI reply:", reply)}
            onRegenerateAiReply={() => console.log("Regenerating AI reply")}
          />
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
