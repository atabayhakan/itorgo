import { ThreadChat } from "@/components/messages/ThreadChat";

export default async function ThreadPage({ params }: { params: Promise<{ threadId: string }> }) {
  const { threadId } = await params;
  return <ThreadChat threadId={threadId} />;
}
