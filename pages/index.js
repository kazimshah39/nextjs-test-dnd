import { GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import { resetServerContext } from "react-beautiful-dnd";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function Home() {
  const data = [
    {
      name: "One",
      id: "1",
    },
    {
      name: "Two",
      id: "2",
    },
    {
      name: "Three",
      id: "3",
    },
    {
      name: "Four",
      id: "4",
    },
    {
      name: "Five",
      id: "5",
    },
  ];

  const [list, setList] = useState(data);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onEnd = (result) => {
    setList(reorder(list, result.source.index, result.destination.index));
  };

  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setReady(true);
    }
  }, []);

  return (
    <>
      {ready && (
        <DragDropContext onDragEnd={onEnd}>
          <Droppable droppableId="12345678">
            {(provided) => (
              <ul className="my-list" ref={provided.innerRef}>
                {list.map((item, index) => (
                  <Draggable draggableId={item.id} key={item.id} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {item.name}
                      </li>
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </>
  );
}
