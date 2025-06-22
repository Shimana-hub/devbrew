"use client";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDashboardStore } from "@/lib/store";
import { GitHubFeed } from "./GitHubFeed";
import { WeatherWidget } from "./WeatherWidget";
import { Bookmarks } from "./Bookmarks";
import { Notes } from "./Notes";
import { PomodoroTimer } from "./PomodoroTimer";

const widgetMap = {
  github: <GitHubFeed username="Shimana-hub" />,
  weather: <WeatherWidget city="Lagos" />,
  bookmarks: <Bookmarks />,
  notes: <Notes />,
  timer: <PomodoroTimer />,
};

function SortableItem({ id }: { id: string }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {widgetMap[id as keyof typeof widgetMap]}
    </div>
  );
}

export function SortableGrid() {
  const { widgetOrder, setWidgetOrder } = useDashboardStore();

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = widgetOrder.indexOf(active.id);
      const newIndex = widgetOrder.indexOf(over.id);
      const newOrder = arrayMove(widgetOrder, oldIndex, newIndex);
      setWidgetOrder(newOrder);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={widgetOrder}
        strategy={verticalListSortingStrategy}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {widgetOrder.map((id) => (
            <SortableItem key={id} id={id} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}