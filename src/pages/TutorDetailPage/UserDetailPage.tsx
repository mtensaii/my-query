import usePermission from '@/hooks/useAccountType';
import CategoryTag from '@/components/CategoryTag/CategoryTag';
import PayPal from '@/components/PayPalButton/PayPalButton';
import { getUserBalance } from '@/services/wallet.service';
import { Icon } from '@iconify/react';
import {
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
} from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { FunctionComponent, useEffect, useState } from 'react';
import './UserDetailPage.scss';

interface UserDetailPageProps {}

const { Item } = Form;

const UserDetailPage: FunctionComponent<UserDetailPageProps> = () => {
  const [deposit, setDeposit] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDepositModalVisible, setIsDepositModalVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() => {
    if (window.innerWidth < 768) {
      return false;
    }
    return true;
  });
  const [, setReload] = useState(false);
  const [formRent] = Form.useForm();
  const [rentingMethod, setRentingMethod] = useState();
  const checkRole = usePermission();
  const [balance, setBalance] = useState(125000);
  const tranSuccess = async (payment: any) => {
    console.log(payment);
  };

  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  };

  const [windowSize, setWindowSize] = useState(getWindowSize());

  // useEffect(() => {
  //   const getAccountType = async () => {
  //     const res = await checkRole();

  //     console.log(res);
  //   };

  //   getAccountType();
  // }, [checkRole]);

  useEffect(() => {
    const getBalance = async () => {
      const res = await getUserBalance();
      if (res?.status === 200) {
        setBalance(res?.data);
      }
    };
    getBalance();
  }, []);

  useEffect(() => {
    if (windowSize.innerWidth < 994) {
      setIsDesktop(false);
    } else {
      setIsDesktop(true);
      setReload((prev) => !prev);
    }
  }, [windowSize]);

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    formRent.submit();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFormRentFinish = (v: any) => {
    console.log(v);
  };

  const handleRentingMethodChange = (v: any) => {
    setRentingMethod(v);
  };

  const handleDepositOk = () => {
    setIsDepositModalVisible(false);
  };

  const handleDepositCancel = () => {
    setIsDepositModalVisible(false);
  };

  return (
    <Row className='user-detail-page' gutter={[10, 10]}>
      <Modal
        title='RENT TUTOR'
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose
      >
        <Form
          labelCol={{ span: 7 }}
          labelAlign={'left'}
          wrapperCol={{ span: 17 }}
          form={formRent}
          initialValues={{ tutor: 'Ana' }}
          onFinish={handleFormRentFinish}
        >
          <Item label={'Tutor'} name={'tutor'}>
            <Input disabled></Input>
          </Item>
          <Item label={'Renting method'} name={'rentingMethod'}>
            <Select
              onChange={handleRentingMethodChange}
              placeholder={'Select renting method'}
            >
              <Select.Option value='hour-call'>
                <span>Hour Call</span>
              </Select.Option>
              <Select.Option value='lesson'>
                <span>Lesson</span>
              </Select.Option>
            </Select>
          </Item>
          {rentingMethod === 'hour-call' ? (
            <Item label={'Price'} name={'priceByHour'}>
              <Input disabled></Input>
            </Item>
          ) : null}
          {rentingMethod === 'lesson' ? (
            <Item label={'Price'} name={'priceByLesson'}>
              <Input disabled></Input>
            </Item>
          ) : null}
          <Item label={'Message'} name={'message'}>
            <Input.TextArea></Input.TextArea>
          </Item>
        </Form>
      </Modal>
      <Col className='user-detail-page-main' lg={{ span: 18 }}>
        <div className='card basic-user-info' style={{ padding: 0 }}>
          <img
            src='https://thumbs.dreamstime.com/b/portrait-smiling-school-teacher-holding-books-classroom-77909586.jpg'
            alt=''
          />
          <div className='basic-info-content'>
            <b className='name'>Ana </b>
            <span className='job'>Front-end Developer</span>
            <div className='location'>
              <Icon icon='akar-icons:location' />
              <span>Hanoi, Vietnam</span>
            </div>
            <div className='rate'>
              <b>Rate</b>: 8.5/10
            </div>
            <div className='tag-field'>
              <CategoryTag tagName='math' />
              <CategoryTag tagName='C++' />
              <CategoryTag tagName='Javascript' />
              <CategoryTag tagName='Java' />
            </div>
          </div>
        </div>
        {isDesktop ? null : (
          <>
            <div className='card rent-mobile'>
              <b className='title'>Tutor rental</b>
              <div className='btn-field'>
                <div className='btn rent-btn' onClick={showModal}>
                  Rent
                </div>
                <div className='btn chat-btn'>
                  <Icon
                    icon='bxs:message'
                    style={{ transform: 'translateY(1px)' }}
                  />
                  Chat
                </div>
              </div>
            </div>
          </>
        )}
        <div className='card highlights'>
          <b className='title'>Highlights</b>
          <div className='highlights-content'>
            <div className='highlights-content-item'>
              <span className='item-number'>43</span>
              <span className='item-type'>Student trained</span>
            </div>
            <Divider
              type='vertical'
              style={{ height: 80, borderColor: '#b5b5b5' }}
            />
            <div className='highlights-content-item'>
              <span className='item-number'>423</span>
              <span className='item-type'>Reviews received</span>
            </div>
          </div>
        </div>

        <div className='card about'>
          <b className='title'>About me</b>
          <div className='about-content'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
            reiciendis corrupti repellat alias dignissimos, hic nemo eveniet sit
            commodi voluptate quo atque esse nobis mollitia numquam fuga
            doloremque dolorem assumenda. Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Qui dignissimos atque magnam
            temporibus minima cupiditate, dolorum placeat ipsam numquam ea quis,
            error autem quisquam dicta. Incidunt explicabo consectetur doloribus
            cum.
          </div>
        </div>

        <div className='card feedbacks'>
          <b className='title'>Feedback</b>
          <div className='feedbacks-content'></div>
        </div>
      </Col>
      {isDesktop ? (
        <Col className='tutor-detail-page-sider' lg={{ span: 6 }}>
          <div className='card'>
            <b className='title'>
              Update Profile <EditOutlined />
            </b>
          </div>
          <div className='card'>
            <b className='title'>Tutor rental</b>
            <div className='btn-field'>
              <div className='btn rent-btn' onClick={showModal}>
                Rent
              </div>
              <div className='btn chat-btn'>
                <Icon
                  icon='bxs:message'
                  style={{ transform: 'translateY(1px)' }}
                />
                Chat
              </div>
            </div>
          </div>
          <div className='card'>
            <b className='title'>Wallet</b>
            <div className='wallet-balance'>
              {balance} <span>VNĐ</span>
            </div>
            <div className='wallet-deposit'>
              <div
                className='wallet-deposit-item'
                onClick={() => {
                  setIsDepositModalVisible(true);
                }}
              >
                Deposit
              </div>
              <Divider type='vertical' style={{ height: 30, margin: 0 }} />
              <div className='wallet-deposit-item'>Withdraw</div>
            </div>
            <Modal
              title='Deposit'
              visible={isDepositModalVisible}
              onOk={handleDepositOk}
              onCancel={handleDepositCancel}
              footer={null}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              destroyOnClose
            >
              <InputNumber
                addonAfter='VNĐ'
                placeholder='Deposit amount'
                style={{ marginBottom: 20, width: '100%' }}
                onChange={(v: any) => {
                  setDeposit(v);
                }}
              />
              <PayPal total={deposit} tranSuccess={tranSuccess} />
            </Modal>
          </div>
          <div className='card'>
            <b className='title'>Contact</b>
            <div className='btn-field'>
              <div className='btn chat-btn'>
                <Icon
                  icon='bxs:message'
                  style={{ transform: 'translateY(1px)' }}
                />
                Chat
              </div>
            </div>
          </div>
          <div className='card'>
            <b className='title'>People also visit tutors</b>
          </div>
        </Col>
      ) : null}
    </Row>
  );
};

export default UserDetailPage;