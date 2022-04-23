import React, { useState, useEffect, useCallback } from 'react';
import { Button, DatePicker, Checkbox, Card, Avatar, List } from 'antd';
import moment from 'moment';
import { TIME } from './data';
import 'antd/dist/antd.css';

export default function App() {
  const [time, setTime] = useState(TIME);
  const [cards, setCards] = useState(false);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [date, setDate] = useState();

  const { Meta } = Card;
  const { RangePicker } = DatePicker;
  const dateFormat = 'DD-MM-YYYY';

  const onChange = (date, dateString) => setDate(date);
  const onButtonClick = () => setCards(true);

  //----------------------------------------------------------
  const minDate = moment().format(dateFormat);
  const maxDate = moment().add(1, 'months').format(dateFormat);

  const disabledDate = (current) => {
    let customDate = moment().format(dateFormat);
    return current && current < moment(customDate, dateFormat);
  };

  const sortAvailable = (e) =>
    e.target.checked
      ? setTime(TIME.filter(({ available }) => available))
      : setTime(TIME);

  const getText = (isAvailable) =>
    isAvailable ? (
      <Checkbox onChange={onChange}>Book slot</Checkbox>
    ) : (
      'Already Booked 🛑'
    );

  const onOpenChange = (open) => console.log(open);

  useEffect(() => {
    date && cards && setIsCardVisible(true);
  }, [date, cards]);

  return (
    <div style={{ flex: 1, margin: 20 }}>
      <h1 style={{ alignSelf: 'center' }}>Hello Player 👋</h1>
      <DatePicker
        disabledDate={disabledDate}
        onChange={onChange}
        onOpenChange={onOpenChange}
      />
      {/* <RangePicker disabledDate={disabledDate} /> */}
      <Button onClick={onButtonClick} type="primary" style={{ marginLeft: 8 }}>
        Search
      </Button>
      {isCardVisible && (
        <Checkbox style={{ marginLeft: 20 }} onChange={sortAvailable}>
          Show only available slots
        </Checkbox>
      )}
      {isCardVisible && (
        <>
        <List
          style={{ marginTop: 30 }}
          grid={{
            gutter: 16,
            xs: '1',
            sm: '2',
            md: '2',
            lg: '2',
            xl: '4',
            xxl: '4',
          }}
          dataSource={time}
          renderItem={({ slot, available }) => (
            <List.Item>
              <Card
                style={{
                  width: 300,
                  marginTop: 16,
                  backgroundColor: 'light-pink',
                }}
                loading={false}
              >
                <Meta
                  avatar={'🏸'}
                  title={`Time slot ${slot}`}
                  description={getText(available)}
                />
              </Card>
            </List.Item>
          )}
        />
        <Button onClick={()=>alert('Ok')} type="primary" style={{ marginLeft: 8 }}>
        Book now
      </Button></>
      )}
    </div>
  );
}
