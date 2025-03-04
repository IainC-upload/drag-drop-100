import React, { useState } from 'react';
import { DndContext, DragEndEvent, useSensors, useSensor, PointerSensor } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';

const initialItems = Array.from({ length: 100 }, (_, index) => `Item ${index + 1}`);

const App: React.FC = () => {
  const [items, setItems] = useState(initialItems);
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const newItems = Array.from(items);
      const activeIndex = newItems.indexOf(active.id as string);
      const overIndex = newItems.indexOf(over?.id as string);

      newItems.splice(activeIndex, 1);
      newItems.splice(overIndex, 0, active.id as string);

      setItems(newItems);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-lg shadow-lg">
      <h1 className="text-xl font-bold mb-4">Editable Draggable List</h1>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {items.map((item, index) => (
              <SortableItem key={index} id={item} index={index} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default App;
