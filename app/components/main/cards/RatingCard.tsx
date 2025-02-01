import { Rate } from 'antd';
import { FaUserAlt } from 'react-icons/fa';
import { MotionDiv } from '../content/MotionDiv';

export interface Rating {
  id: number | string;
  quantity: number;
  product_id: number;
  name: string;
  avatar?: string;
  comment?: string | null;
}

interface RatingCardProps {
  testimonial: Rating;
}

export function RatingCard({ testimonial }: RatingCardProps) {
  return (
    <MotionDiv className="group w-full rounded-2xl border border-solid border-gray-300 bg-white p-6 transition-all duration-500 hover:border-indigo-600">
      {/* Avatar y nombre */}
      <div className="mb-6 flex items-center gap-5">
        {testimonial?.avatar ? (
          <img
            src={testimonial.avatar}
            alt={`${testimonial.name}`}
            className="h-12 w-12 rounded-full"
          />
        ) : (
          <FaUserAlt className="h-12 w-12 rounded-full" />
        )}
        <div className="grid gap-1">
          <h5 className="font-medium text-gray-900 transition-all duration-500">
            {testimonial.name}
          </h5>
          {/* <span className="text-sm leading-6 text-gray-500">
            {testimonial.role}
          </span> */}
        </div>
      </div>

      {/* Estrellas de calificación */}
      <div className="mb-6 flex items-center gap-1 text-amber-500 transition-all duration-500">
        <Rate disabled defaultValue={Number(testimonial.quantity / 2)} />
      </div>

      {/* Comentario */}
      <p className="text-sm leading-6 text-gray-500 transition-all duration-500 group-hover:text-gray-800">
        {testimonial.comment}
      </p>
    </MotionDiv>
  );
}
