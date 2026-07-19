import ActiveNowRow from './ActiveNowRow';
import WeekInReviewCard from './WeekInReviewCard';
import RotatingSpotlight from './RotatingSpotlight';

export default function RightSidebarContent() {
  return (
    <>
      <ActiveNowRow />
      <WeekInReviewCard />
      <RotatingSpotlight />
    </>
  );
}