import React from 'react';
import {imagePath} from '../helper';
import {Link} from 'react-router-dom';
import Default from '../layouts/Default';
import Accordion from '../components/accordion/Accordion';
import Slider from 'react-slick';
import {sliderSettings} from '../helper';
import ProgramLink from '../components/app/ProgramLink';

export default function MainPage() {
  return (
    <Default>
      <div className="about-section-background">
        <div className="about-section-second-background">
          <div className="about-section section">
            <div className="row-1">
              <h2>Обретите гармонию,<br/> не переплачивая<br/> за психологов</h2>
              <div className="text">
                <div className="hide-mobile">
                  Устали от постоянного стресса, исчерпали свой внутренний ресурс или просто хотите наладить отношения с близкими?
                </div>
                <div className="hide-desktop">
                  Устали от стресса, исчерпали внутренний ресурс или хотите<br/> наладить отношения?
                </div>
              </div>
              <ProgramLink linkProp="to" component={
                <Link to="/" className="btn hide-mobile">Подобрать программу</Link>
              }/>
            </div>
            <div className="row-2">
              <div className="text">
                Мы подберем для вас уникальную программу из простых и увлекательных упражнений и поможем вам преодолеть
                трудности
                самостоятельно, шаг за шагом - как, где и когда вам удобно.
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
            <span>Снять тревогу и стресс</span>
          </div>
          <div className="problem">
            <img src={imagePath('problems/2.png')} alt="Well mind" width="180px" style={{paddingTop: '17px'}}/>
            <span>Восстановить душевный баланс</span>
          </div>
          <div className="problem">
            <img src={imagePath('problems/3.png')} alt="Well mind" width="233px" style={{paddingTop: '13px'}}/>
            <span>Обрести жизненный смысл</span>
          </div>
          <div className="problem">
            <img src={imagePath('problems/4.png')} alt="Well mind" width="275px" style={{top: '-29px'}}/>
            <span style={{marginTop: '-14px'}}>Наладить отношения с близкими, друзьями и коллегами</span>
          </div>
          <div className="problem">
            <img src={imagePath('problems/5.png')} alt="Well mind" width="215px" style={{top: '-29px'}}/>
            <span style={{marginTop: '-14px'}}>Найти ресурс для достижения ваших целей</span>
          </div>
          <div className="problem">
            <img src={imagePath('problems/6.png')} alt="Well mind" width="277px" style={{top: '-10px'}}/>
            <span style={{marginTop: '5px'}}>И многое другое, что мешает радоваться жизни</span>
          </div>
        </Slider>
      </div>
      <div className="about-section section">
        <div className="row-3">
          <h2>Следуйте своему<br/> личному плану</h2>
          <div className="text">
            <ul>
              <li>Программа работы по результатам теста, составленного профессиональным психологом</li>
              <li>Уникальные и простые занятия на каждый день</li>
              <li>Арт- и музыкальная терапия, упражнения в игровой форме</li>
              <li>Полезные статьи по психологии для осознанной работы над собой</li>
              <li>Обратная связь по любым вопросам</li>
            </ul>
          </div>
        </div>
        <div className="row-4">
          <div>
            <h2>Подберите психолога для<br/> консультаций</h2>
            <div className="text">
              <div className="hide-mobile">
                <p>Вы сможете получить личные занятия в дополнение к основной программе.</p>
                <p><b>Только дипломированные специалисты</b> с реальным опытом работы, прошедшие собеседование с командой
                  Well-mind!
                </p>
                <p>Формат занятий на выбор:<br/> <i>очно или онлайн</i></p>
              </div>
              <div className="hide-desktop">
                <ul>
                  <li>Вы сможете получить личные занятия в дополнение к основной программе.</li>
                  <li>Формат занятий на выбор:<br/> <i>очно или онлайн</i></li>
                </ul>
                <p style={{textAlign: 'center'}}><b>Только дипломированные специалисты</b> с реальным опытом работы, прошедшие
                  собеседование с командой Well-mind!</p>
              </div>
            </div>
            <Link to="/psychologists" className="btn hide-mobile">Подобрать психолога</Link>
          </div>
        </div>
        <Link to="/psychologists" className="btn hide-desktop">Подобрать психолога</Link>
      </div>
      <div className="how-section">
        <div className="section">
          <h2>Well-mind устроен<br/> легко и удобно</h2>
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
                  <div className="how-title">Снова радуйтесь жизни вместе с Well-mind!</div>
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