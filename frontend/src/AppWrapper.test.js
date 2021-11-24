import {shallow} from 'enzyme';
import AppWrapper from './AppWrapper';

it('renders without crashing', () => {
  shallow(<AppWrapper/>);
});
