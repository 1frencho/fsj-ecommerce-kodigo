import { RatingCard, type Rating } from '@/components/main/cards/RatingCard';

const MOCK_RATINGS: Rating[] = [
  {
    id: 1,
    name: 'Jane D',
    role: 'CEO',
    avatar: 'https://pagedone.io/asset/uploads/1695365794.png',
    rating: 4,
    comment:
      'The user interface of this app is so intuitive, I was able to start using it without any guidance.',
  },
  {
    id: 2,
    name: 'John C',
    role: 'Developer',
    avatar: 'https://pagedone.io/asset/uploads/1695365794.png',
    rating: 5,
    comment:
      'The user interface of this app is so intuitive, I was able to start using it without any guidance.',
  },
  {
    id: 3,
    name: 'John C',
    role: 'Developer',
    avatar: 'https://pagedone.io/asset/uploads/1695365794.png',
    rating: 5,
    comment:
      'The user interface of this app is so intuitive, I was able to start using it without any guidance.',
  },
];
function RatingsPanel() {
  return (
    <>
      <section className="flex flex-col items-center justify-center gap-4 p-4 md:p-8">
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {MOCK_RATINGS.map((rating) => (
            <RatingCard key={rating.id} testimonial={rating} />
          ))}
        </div>
      </section>
    </>
  );
}

export default RatingsPanel;
