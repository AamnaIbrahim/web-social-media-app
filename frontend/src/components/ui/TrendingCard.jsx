import Card from './Card';

export default function TrendingCard({ topic, postCount, category, onClick }) {
  return (
    <Card padded className="cursor-pointer" onClick={onClick}>
      <p className="text-xs text-text-tertiary mb-0.5">{category}</p>
      <p className="text-sm font-semibold text-text-primary">#{topic}</p>
      <p className="text-xs text-text-tertiary mt-0.5">{postCount.toLocaleString()} posts</p>
    </Card>
  );
}