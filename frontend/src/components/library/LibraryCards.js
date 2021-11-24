import Button from '../Button';
import LibraryCard from './LibraryCard'
import {useEffect, useState} from 'react';
import Slider from 'react-slick';
import {sliderSettings} from '../../helper';
import api from '../../Api';

export default function LibraryCards() {
  const {response} = api.useAxios('get_library_list');
  const [items, setItems] = useState([]);
  useEffect(() => {
    if (response?.list?.length) setItems(response.list);
  }, [response]);
  const perRow = 4;
  const [visibleItems, setVisibleItems] = useState([]);
  useEffect(() => {
    setVisibleItems(items.slice(0, perRow));
  }, [items])
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