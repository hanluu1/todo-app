import { CheckIcon, PencilAltIcon, TagIcon, TrashIcon, XIcon, LightningBoltIcon} from '@heroicons/react/outline';
import { useRef, useState } from 'react';

import { type Todo, useTodoStore } from '@/stores';

import { DeletePanel } from './delete-panel';
import { StatusOptions } from './status-options';
import { TagSelectModal } from './tag-select-modal';


export function TodoItem({ item } : { item: Todo }) {
  const [editing, setEditing] = useState(false);
  const [inputText, setInputText] = useState(item.title);
  const [isOpen, setIsOpen] = useState(false);
  const [showTagModal, setShowTagModal] = useState(false);

  const inputRef = useRef(null);

  return (
    <li
      id={item?.id}
      className="flex rounded-lg w-full items-center justify-between bg-white p-3 text-sm text-orange-200" 
    >
      {editing ? (
        <div className="flex w-full items-center">
          <input
            ref={inputRef}
            type="text"
            name="edit-todo"
            id="edit-todo"
            defaultValue={item?.title}
            onChange={(e) => setInputText(e.target.value)}
            className="size-full border-0 bg-white p-3 text-[16px] text-red-300 outline-transparent"
            
          />
          <button>
            <CheckIcon
              className="w-5 cursor-pointer"
              onClick={() => {
                useTodoStore.getState().updateTodo(item.id, { title: inputText });
                setEditing(false);
              }}
            />
          </button>
          <button>
            <XIcon
              className="w-5 cursor-pointer"
              onClick={() => {
                setEditing(false);
                setInputText(item.title);
              }}
            />
          </button>
        </div>
      ) : (
        <div className='flex flex-col w-full gap-2'>
          
          <div className="flex flex-row w-full justify-between items-center cursor-pointer" 
          onClick={()=> setEditing(true)
          }>

            <StatusOptions item={item} />
            <div className="flex items-center gap-1 " >
              <PencilAltIcon className="w-5 cursor-pointer" onClick={() => setEditing(true)} />
              <TrashIcon className="w-5 cursor-pointer text-red-500" onClick={(e) => {e.stopPropagation();
              setIsOpen(true);} }/>
              <TagIcon className="w-5 cursor-pointer text-blue-400" onClick={(e) => {e.stopPropagation();
              setShowTagModal(true);}} />
            </div>
            
          </div>
          {!!item.tags?.length && (
            <div className="flex flex-wrap gap-2 p-2">
              {item.tags.map((tag) => (
                <div
                  className="rounded-full px-4 py-1 text-yellow-100"
                  key={tag.title}
                  style={{
                    backgroundColor: tag.color,
                  }}
                >
                  {tag.title}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <DeletePanel item={item} isOpen={isOpen} onClose={() => setIsOpen(false)} />
        
      <TagSelectModal data={item} isOpen={showTagModal} onClose={() => setShowTagModal(false)} />
    </li>
  );
}
