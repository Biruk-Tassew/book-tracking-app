import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import BookRow from './BookRow';

interface Props {
  books: any[];
  onUpdateStatus: (id: number, title: string, status: string) => void;
  onDelete: (id: number) => void;
}

const BookTable: React.FC<Props> = ({ books, onUpdateStatus, onDelete }) => {
  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    
    if (destination) {
      const draggedBookIndex = books.findIndex(book => book.id.toString() === draggableId);

      if (draggedBookIndex !== -1) {
        const draggedBook = books[draggedBookIndex];

        onUpdateStatus(draggedBook.id, draggedBook.title, destination.droppableId);
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-3 gap-4">
        {['to-read', 'reading', 'completed'].map((status) => (
          <div key={status} className="col">
            <h2 className="text-lg font-semibold mb-2">{status.toUpperCase()}</h2>
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gray-100 rounded p-4 h-96 overflow-y-auto" 
                >
                  {books
                    .filter((book) => book.status === status)
                    .map((book, index) => (
                      <Draggable key={book.id} draggableId={book.id.toString()} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <BookRow key={book.id} book={book} onUpdateStatus={onUpdateStatus} onDelete={onDelete} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default BookTable;