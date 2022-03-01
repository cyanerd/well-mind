import React, {useEffect, useState} from 'react';
import PsychologistItem from './PsychologistItem';
import {sliderSettings} from '../../helper';
import Slider from 'react-slick';
import api from '../../Api';
import IPsychologistItem from './type';

const PsychologistsList: React.FC = () => {
  const [items, setItems] = useState<IPsychologistItem[]>([]);
  const {response} = api.useAxios('get_consultants');
  useEffect(() => {
    if (response?.consultants?.length) setItems(response.consultants);
  }, [response]);

  return (
    <Slider {...sliderSettings} className="ps-list">
      {items.map(item => <PsychologistItem key={item.id} item={item}/>)}
    </Slider>
  );
}

export default PsychologistsList;