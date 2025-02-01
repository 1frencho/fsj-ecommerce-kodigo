import { FaStar } from 'react-icons/fa';

export interface Rating {
  id: number;
  name: string;
  role: string;
  avatar: string;
  rating: number; // 1-5
  comment: string;
}

interface RatingCardProps {
  testimonial: Rating;
}

export function RatingCard({ testimonial }: RatingCardProps) {
  return (
    <div className="group w-full rounded-2xl border border-solid border-gray-300 bg-white p-6 transition-all duration-500 hover:border-indigo-600">
      {/* Avatar y nombre */}
      <div className="mb-6 flex items-center gap-5">
        <img
          src={testimonial.avatar}
          alt={`${testimonial.name}`}
          className="h-12 w-12 rounded-full"
        />
        <div className="grid gap-1">
          <h5 className="font-medium text-gray-900 transition-all duration-500">
            {testimonial.name}
          </h5>
          <span className="text-sm leading-6 text-gray-500">
            {testimonial.role}
          </span>
        </div>
      </div>

      {/* Estrellas de calificación */}
      <div className="mb-6 flex items-center gap-1 text-amber-500 transition-all duration-500">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={
              index < testimonial.rating ? 'text-amber-500' : 'text-gray-300'
            }
          />
        ))}
      </div>

      {/* Comentario */}
      <p className="text-sm leading-6 text-gray-500 transition-all duration-500 group-hover:text-gray-800">
        {testimonial.comment}
      </p>
    </div>
  );
}
