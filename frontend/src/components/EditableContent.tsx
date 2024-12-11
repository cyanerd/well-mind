import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import eventBus from '../EventBus';

interface IEditableContentProps { code: string }

const EditableContent: React.FC<IEditableContentProps> = (props) => {
  const user = useSelector((state: RootState) => state.app.user);
  const content = useSelector((state) => state.app.content);

  const handleDoubleClick = () => {
    eventBus.dispatch('SET_EDIT_CONTENT_DATA', {
      content: content[props.code] || '',
      code: props.code
    });
    Fancybox.show([{ src: '#edit-content-modal' }]);
  }

  if (!user?.is_admin) {
    return <span data-code={props.code} dangerouslySetInnerHTML={{__html: content[props.code] || ''}}></span>;
  }

  return <span data-code={props.code} className="editable-content" onDoubleClick={handleDoubleClick} dangerouslySetInnerHTML={{__html: content[props.code] || ''}}></span>
}

export default EditableContent;