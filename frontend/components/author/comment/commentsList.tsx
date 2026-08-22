import CommentCard from "./commentCard";
import CommentSkeleton from "./commentSkeleton";


interface CommentsListProps {
  comments: any[];

  loading: boolean;
}


export default function CommentsList({
  comments,
  loading,
}: CommentsListProps) {
  if (loading) {
    return (
      <div className="space-y-4">

        {Array.from(
          { length: 5 },
        ).map(
          (_, index) => (
            <CommentSkeleton
              key={index}
            />
          ),
        )}

      </div>
    );
  }


  return (
    <div className="space-y-4">

      {comments.map(
        (comment) => (

          <CommentCard
            key={comment._id}
            comment={comment}
          />

        ),
      )}

    </div>
  );
}