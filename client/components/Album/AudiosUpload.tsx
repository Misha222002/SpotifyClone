import { useTypedSelector } from "@/hooks/useTypedSelector";
import { NextThunkDispatch, wrapper } from "@/store";
import { fetchTracks, firstFetchTracks } from "@/store/actions-creators/track";
import { ITrack } from "@/types/track";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import TrackForAdd from "./TrackForAdd";
import { Button, ListItem } from "@mui/material";

interface droppable {
  droppableId: string;
  index: number;
}

interface AudiosUploadProps {
  setAudios: Function;
}

// interface resultInterface {
//   [index: keyof result]: any;
// }

const reorder = (list: ITrack[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (
  source: ITrack[],
  destination: ITrack[],
  droppableSource: droppable,
  droppableDestination: droppable
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result: { [key: string]: ITrack[] } = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
const grid = 8;
let page = 0;

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "lightblue" : "white",
  padding: grid,
  minWidth: "500px",
  width: "auto",
  overflowY: "scroll" as "scroll",
  border: "1px solid lightgrey",
});

const AudiosUpload: React.FC<AudiosUploadProps> = ({ setAudios }) => {
  const [state, setState] = useState<[ITrack[], ITrack[]]>([[], []]);
  const { tracks, error, totalCount } = useTypedSelector(
    (state) => state.track
  );
  const dispatch = useDispatch() as NextThunkDispatch;
  useEffect(() => {
    async function fetchAndDispatch() {
      await dispatch(await firstFetchTracks());
    }
    fetchAndDispatch();
  }, []);
  const fetchExtraTrecks = async () => {
    page += 5;
    await dispatch(await fetchTracks(5, page));
  };
  useEffect(() => {
    setState([
      state[0],
      [...tracks.filter((audio) => !state[0].includes(audio))],
    ]);
  }, [tracks]);

  useEffect(() => {
    setAudios(state[0]);
  }, [state]);

  function onDragEnd(result: any) {
    const { source, destination } = result;
    // dropped outside the list
    if (!destination) {
      return;
    }

    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState([newState[0], newState[1]]);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setState([newState[0], newState[1]]);
    }
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          maxHeight: "500px",
          //   justifyContent: "space-between",
        }}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          {state.map((el, ind) => (
            <Droppable key={ind} droppableId={`${ind}`}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  {...provided.droppableProps}
                >
                  {ind == 0 && (
                    <div style={{ textAlign: "center", fontSize: "20px" }}>
                      Выбранные треки
                    </div>
                  )}
                  {ind == 1 && (
                    <div style={{ textAlign: "center", fontSize: "20px" }}>
                      Все треки
                    </div>
                  )}
                  {el.map((item, index) => (
                    <Draggable
                      key={item._id}
                      draggableId={item._id}
                      index={index}
                    >
                      {(provided: any, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TrackForAdd
                            track={item}
                            isDraggble={snapshot.isDragging}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  {ind == 1 && totalCount > tracks.length && (
                    <Button onClick={() => fetchExtraTrecks()}>
                      Загрузить еще
                    </Button>
                  )}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
};

export default AudiosUpload;
