import clsx from 'clsx';

import { type Todo, useTodoStore } from '@/stores';

export const TagSelect = ({ data }: { data: Todo }) => {
  const tags = useTodoStore((state) => state.tags);

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <button
          className={clsx(
            'rounded-full px-4 py-1 text-white',
            data.tags?.find((item) => item.title === tag.title) ? 'underline' : '',
          )}
          key={tag.title}
          style={{
            backgroundColor: tag.color,
          }}
          onClick={() => {
            if (!data.tags?.find((item) => item.title === tag.title)) {
              useTodoStore.getState().updateTodo(data.id, { tags: [...(data.tags || []), tag] });
            } else {
              useTodoStore
                .getState()
                .updateTodo(data.id, { tags: data.tags.filter((item) => item.title !== tag.title) });
            }
          }}
        >
          {tag.title}
        </button>
      ))}
    </div>
  );
};
