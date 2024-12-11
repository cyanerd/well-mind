import React from 'react';
import {imagePath} from '../helper';
import {Link} from 'react-router-dom';
import Default from '../layouts/Default';
import Accordion from '../components/accordion/Accordion';
import Slider from 'react-slick';
import {sliderSettings} from '../helper';
import ProgramLink from '../components/app/ProgramLink';
import EditableContent from '../components/EditableContent';

const MainPage: React.FC = () => {
  return (
    <Default>
      <div className="about-section-background">
        <div className="about-section-second-background">
          <div className="about-section section">
            <div className="row-1">
              <h2>
                <EditableContent code="main1" />
              </h2>
              <div className="text">
                <div className="hide-mobile">
                  <EditableContent code="main2" />
                </div>
                <div className="hide-desktop">
                  <EditableContent code="main3" />
                </div>
              </div>
              <ProgramLink linkProp="to" component={
                <Link to="/" className="btn hide-mobile">Подобрать программу</Link>
              }/>
            </div>
            <div className="row-2">
              <div className="text">
                <EditableContent code="main4" />
              </div>
              <Link to="/test" className="btn hide-desktop">Подобрать программу</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="problems-section section">
        <h2>Решите ваши проблемы<br/> вместе с нами</h2>
        <Slider {...sliderSettings} className="problems-list">
          <div className="problem">
            <img src={imagePath('problems/1.png')} alt="Well mind" width="194px" style={{paddingTop: '16px'}}/>
            <span><EditableContent code="main5" /></span>
          </div>
          <div className="problem">
            <img src={imagePath('problems/2.png')} alt="Well mind" width="180px" style={{paddingTop: '17px'}}/>
            <span><EditableContent code="main6" /></span>
          </div>
          <div className="problem">
            <img src={imagePath('problems/3.png')} alt="Well mind" width="233px" style={{paddingTop: '13px'}}/>
            <span><EditableContent code="main7" /></span>
          </div>
          <div className="problem">
            <img src={imagePath('problems/4.png')} alt="Well mind" width="275px" style={{top: '-29px'}}/>
            <span style={{marginTop: '-14px'}}><EditableContent code="main8" /></span>
          </div>
          <div className="problem">
            <img src={imagePath('problems/5.png')} alt="Well mind" width="215px" style={{top: '-29px'}}/>
            <span style={{marginTop: '-14px'}}><EditableContent code="main9" /></span>
          </div>
          <div className="problem">
            <img src={imagePath('problems/6.png')} alt="Well mind" width="277px" style={{top: '-10px'}}/>
            <span style={{marginTop: '5px'}}><EditableContent code="main10" /></span>
          </div>
        </Slider>
      </div>
      <div className="about-section section">
        <div className="row-3">
          <h2><EditableContent code="main11" /></h2>
          <div className="text">
            <EditableContent code="main12" />
          </div>
        </div>
        <div className="row-4">
          <div>
            <h2><EditableContent code="main13" /></h2>
            <div className="text">
              <div className="hide-mobile">
                <EditableContent code="main14" />
              </div>
              <div className="hide-desktop">
                <EditableContent code="main15" />
              </div>
            </div>
            <Link to="/psychologists" className="btn hide-mobile">Подобрать психолога</Link>
          </div>
        </div>
        <Link to="/psychologists" className="btn hide-desktop">Подобрать психолога</Link>
      </div>
      <div className="how-section">
        <div className="section">
          <h2><EditableContent code="main16" /></h2>
          <div className="how-list">
            <div className="how-item">
              <div className="how-content">
                <div>
                  <div className="how-title">Пройдите тест</div>
                  <div className="how-text">составленный профессиональным психологом</div>
                </div>
              </div>
              <img src={imagePath('how-1.png')} alt="Well mind"/>
            </div>
            <div className="how-item">
              <img src={imagePath('how-2.png')} alt="Well mind"/>
              <div className="how-content">
                <div>
                  <div className="how-title">Получите личную программу</div>
                  <div className="how-text">с простыми упражнениями на каждый день</div>
                </div>
              </div>
            </div>
            <div className="how-item">
              <div className="how-content">
                <div>
                  <div className="how-title"><EditableContent code="main17" /></div>
                </div>
              </div>
              <img src={imagePath('how-3.png')} alt="Well mind"/>
            </div>
          </div>
          <div className="centered-btn-container">
            <Link to="/test" className="btn">Подобрать программу</Link>
          </div>
        </div>
      </div>
      <div className="questions-section section">
        <h2>Возможно, у вас остались<br/> вопросы</h2>
        <Accordion/>
      </div>
    </Default>
  );
}

export default MainPage;