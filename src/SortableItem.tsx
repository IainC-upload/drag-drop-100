import React from 'react';
import { useSortable } from '@dnd-kit/sortable';

interface SortableItemProps {
  id: string;
  index: number;
}

export const SortableItem: React.FC<SortableItemProps> = ({ id, index }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`flex items-center justify-between p-2 bg-gray-200 rounded-md ${isDragging ? 'bg-blue-200' : ''}`}
      style={{
        opacity: isDragging ? 0.5 : 1, // Only opacity changes when dragging
      }}
    >
      <input
        type="text"
        value={id}
        readOnly
        className="flex-1 p-1 border border-gray-300 rounded-md"
      />
    </div>
  );
};
