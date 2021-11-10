import Default from '../layouts/Default';
import {useParams} from 'react-router-dom';

export default function LibraryItem() {
  let {id} = useParams();
  const item = {
    id,
    title: 'Тревога',
    text: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dolor nisl, tempus nec massa sit amet, imperdiet eleifend neque. Nunc eleifend magna mauris, sed ornare ipsum porttitor pellentesque. Etiam scelerisque placerat vulputate. Vestibulum pellentesque cursus felis, vitae hendrerit ex. Sed dapibus cursus congue. Etiam laoreet auctor ante, suscipit venenatis felis euismod et. Etiam sed magna eu ligula euismod convallis. Fusce id vestibulum mi. Morbi aliquet pharetra nulla, quis lacinia nisi lacinia id. Phasellus sit amet nibh vel lorem rutrum tincidunt eget et purus. Sed iaculis ipsum eget malesuada convallis. Etiam non neque et metus fringilla tristique ac nec erat.</p>'
  }

  return (
    <Default>
      <div className="inner-page">
        <div className="section text-page">
          <h2>{item.title}</h2>
          <div dangerouslySetInnerHTML={{__html: item.text}}/>
        </div>
      </div>
    </Default>
  );
}