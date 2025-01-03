import { useState } from 'react';

import { Button } from '@/components/base';
import { useTodoStore } from '@/stores';

export const NewTagForm = ({ onClose }: { onClose: () => void }) => {
  const [tagTitle, setTagTitle] = useState('');
  const [tagColor, setTagColor] = useState('#ffc0cb');

  return (
    <div className="mt-4 rounded-lg bg-white p-4 shadow-md">
      <h3 className="text-lg font-medium text-black">Input new tag</h3>
      <div className="flex flex-row">
        <input
          type="text"
          value={tagTitle}
          onChange={(e) => setTagTitle(e.target.value)}
          placeholder="Tag Title"
          className="mt-2 w-full rounded border p-2 text-black"
        />
        <input
          type="color"
          value={tagColor}
          onChange={(e) => setTagColor(e.target.value)}
          className="mt-2 rounded border p-2"
        />
      </div>
      <div className="mt-4 flex space-x-2">
        <Button
          color="primary"
          onClick={() => {
            if (tagTitle.trim()) {
              useTodoStore.getState().addTag({ title: tagTitle, color: tagColor });
              onClose();
              setTagTitle('');
              setTagColor('#ffc0cb');
            }
          }}
          text="Save"
        />
        <Button color="blue" onClick={onClose} text="Cancel" />
      </div>
    </div>
  );
};
