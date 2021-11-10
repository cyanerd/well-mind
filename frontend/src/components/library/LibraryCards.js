import Button from '../Button';
import LibraryCard from './LibraryCard'
import {useState} from 'react';
import Slider from 'react-slick';
import {sliderSettings} from '../../helper';

export default function LibraryCards() {
  const items = [
    {
      id: 1,
      title: 'Тревога',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur massa nisi, convallis et varius vitae, congue id risus. Nam feugiat vel ex et ultricies.'
    },
    {
      id: 2,
      title: 'Тревога',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur massa nisi, convallis et varius vitae, congue id risus. Nam feugiat vel ex et ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur massa nisi, convallis et varius vitae, congue id risus. Nam feugiat vel ex et ultricies.'
    },
    {
      id: 3,
      title: 'Тревога',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur massa nisi, convallis et varius vitae, congue id risus. Nam feugiat vel ex et ultricies.'
    },
    {
      id: 4,
      title: 'Тревога',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur massa nisi, convallis et varius vitae, congue id risus. Nam feugiat vel ex et ultricies.'
    },
    {
      id: 5,
      title: 'Тревога',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur massa nisi, convallis et varius vitae, congue id risus. Nam feugiat vel ex et ultricies.'
    },
    {
      id: 6,
      title: 'Тревога',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur massa nisi, convallis et varius vitae, congue id risus. Nam feugiat vel ex et ultricies.'
    },
    {
      id: 7,
      title: 'Тревога',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur massa nisi, convallis et varius vitae, congue id risus. Nam feugiat vel ex et ultricies.'
    },
    {
      id: 8,
      title: 'Тревога',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur massa nisi, convallis et varius vitae, congue id risus. Nam feugiat vel ex et ultricies.'
    },
    {
      id: 9,
      title: 'Тревога',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur massa nisi, convallis et varius vitae, congue id risus. Nam feugiat vel ex et ultricies.'
    },
    {
      id: 10,
      title: 'Тревога',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur massa nisi, convallis et varius vitae, congue id risus. Nam feugiat vel ex et ultricies.'
    },
    {
      id: 11,
      title: 'Тревога',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur massa nisi, convallis et varius vitae, congue id risus. Nam feugiat vel ex et ultricies.'
    },
    {
      id: 12,
      title: 'Тревога',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur massa nisi, convallis et varius vitae, congue id risus. Nam feugiat vel ex et ultricies.'
    },
    {
      id: 13,
      title: 'Тревога',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur massa nisi, convallis et varius vitae, congue id risus. Nam feugiat vel ex et ultricies.'
    }
  ];
  const perRow = 4;
  const [visibleItems, setVisibleItems] = useState(items.slice(0, perRow));
  return (
    <>
      <Slider {...sliderSettings} className="library-list">
        {visibleItems.map(item => <LibraryCard key={item.id} item={item}/>)}
      </Slider>
      {visibleItems.length !== items.length &&
      <div className="centered-btn-container hide-mobile">
        <Button onClick={() => {
          setVisibleItems(items.slice(0, visibleItems.length + perRow));
        }} style={{maxWidth: '400px', display: 'block', margin: '0 auto'}}>Смотреть еще</Button>
      </div>
      }
    </>
  )
}