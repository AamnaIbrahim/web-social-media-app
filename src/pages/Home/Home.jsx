import Feed from '@/features/feed/components/Feed';

export default function Home() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-text-primary">Home</h1>
        <p className="text-sm text-text-secondary">Latest from people you follow</p>
      </div>
      <Feed />
    </div>
  );
}