import { RatingCard, type Rating } from '@/components/main/cards/RatingCard';
import { SkeletonProductCard } from '@/components/main/cards/SkeletonCard';
import { getRatings } from '@/lib/apiEcommerce';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

function RatingsPanel() {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getRatings()
      .then((ratings) => {
        setRatings(ratings);
      })
      .catch((error) => {
        toast.warning('Could not fetch ratings');
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  console.log(ratings);

  return (
    <>
      <section className="flex flex-col items-center justify-center gap-4 p-4 md:p-8">
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {isLoading
            ? [...Array(12)].map((_, i) => <SkeletonProductCard key={i} />)
            : ratings.map((rating) => (
                <RatingCard key={rating.id} testimonial={rating} />
              ))}
        </div>
      </section>
    </>
  );
}

export default RatingsPanel;
