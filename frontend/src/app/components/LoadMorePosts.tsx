
interface LoadMorePostProps {
  pageSize: number;
  getData: Function;
  offset: number;
}

export default function LoadMorePosts({
  pageSize,
  getData,
  offset,
}: LoadMorePostProps) {
  return (
    <div className="flex justify-center">
      <button
        type="button"
        className="px-6 py-3 text-sm rounded-md hover:underline dark:bg-gray-900 dark:text-gray-400"
        onClick={() => getData(pageSize + offset)}
      >
        Load more posts...
      </button>
    </div>
  );
}
