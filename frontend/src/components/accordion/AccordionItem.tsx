import React, {useState} from 'react';
import classNames from 'classnames/bind';

interface IAccordionItemProps {
  isOpened: boolean,
  text: string,
  title: string
}

const AccordionItem: React.FC<IAccordionItemProps> = (props) => {
  const [isToggleOn, setToggleOn] = useState(props.isOpened);
  return (
    <div className={classNames({'spoiler-item': true, active: isToggleOn})}>
      <div className="spoiler-title" onClick={() => setToggleOn(!isToggleOn)}>{props.title}</div>
      <div className="spoiler-text">{props.text}</div>
    </div>
  );
}

export default AccordionItem;