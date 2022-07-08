import QueriesPageQuestionCard from '@/components/QuestionCard/QueriesPageQuestionCard';
import { Icon } from '@iconify/react';
import { FormOutlined, SettingOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Divider,
  Drawer,
  DrawerProps,
  Form,
  Input,
  Modal,
  Pagination,
  PaginationProps,
  Row,
  Select,
  Space,
} from 'antd';
import { FunctionComponent, useEffect, useState } from 'react';
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import './QueriesPage.scss';
import CreateQueryModal from '@/components/CreateQueryModal/CreateQueryModal';
import TagsDropDown from '@/components/TagsDropDown/TagsDropDown';

interface QueriesPageProps {}

const QueriesPage: FunctionComponent<QueriesPageProps> = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formSearch] = Form.useForm();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isDesktop, setIsDesktop] = useState(false);
  const [, setReload] = useState(false);

  /**
   * Drawers handle in MOBILE responsive
   */
  const [drawerVisible, setDrawerVisible] = useState(false);

  const onDrawerClose = () => {
    setDrawerVisible(false);
  };

  const handleDrawerOk = () => {
    formSearch.submit();
    setDrawerVisible(false);
  };
  /**
   * Drawers handle in MOBILE responsive
   */
  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  };

  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    if (windowSize.innerWidth < 993) {
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

  /**
   * Start top filter handle
   * @param values
   */
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const handleSearchKeyUp = (event: any) => {
    if (event.key === 'Enter') {
      if (formSearch.getFieldValue('searchQuery')) {
        formSearch.submit();
      }
      event.target.blur();
    }
  };

  const handleSortOnChange = (v: any) => {
    if (isDesktop) {
      formSearch.submit();
    }
  };
  /**
   * End top filter handle
   */

  /************** */

  /**
   * Start new query handle
   */
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  /**
   * End new query handle
   */

  /************** */

  /**
   * Stat handle routing
   */
  const handleNavigateQueryPage = (v: string) => {
    /**
     * TODO: - Add fetch DATA here
     *
     */
    navigate(
      {
        search: createSearchParams({
          query: String(v),
        }).toString(),
      },
      { replace: true }
    );
  };
  /**
   * End handle routing
   */

  /**
   * START pagination handle
   */
  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (
    current,
    pageSize
  ) => {
    console.log(current, pageSize);
  };

  /**
   * END pagination handle
   */

  return (
    <Form form={formSearch} onFinish={onFinish}>
      <Row className='queries-page' gutter={[20, 15]} justify={'center'}>
        {isDesktop ? (
          <Col className='queries-page-filter' lg={{ span: 5 }}>
            <div className='filter-by-query'>
              <b>Queries</b>
              <div className='filter-by-query-list'>
                <div
                  className={`filter-by-query-item ${
                    searchParams.get('query') === 'all' ||
                    !searchParams.get('query')
                      ? 'active'
                      : null
                  }`}
                  onClick={() => handleNavigateQueryPage('all')}
                >
                  All queries
                </div>
                <div
                  className={`filter-by-query-item ${
                    searchParams.get('query') === 'my-queries' ? 'active' : null
                  }`}
                  onClick={() => handleNavigateQueryPage('my-queries')}
                >
                  My queries
                </div>
                <div
                  className={`filter-by-query-item ${
                    searchParams.get('query') === 'saved-queries'
                      ? 'active'
                      : null
                  }`}
                  onClick={() => handleNavigateQueryPage('saved-queries')}
                >
                  Saved queries
                </div>
              </div>
            </div>

            <div className='filter-by-property'>
              <b>Filter </b>
              <div className='filter-by-property-list'>
                <TagsDropDown form={formSearch} />
              </div>
            </div>
          </Col>
        ) : null}
        <Col className='queries-page-content' lg={{ span: 14 }}>
          <Modal
            title='New Query'
            visible={isModalVisible}
            footer={null}
            onCancel={handleCancel}
          >
            <CreateQueryModal />
          </Modal>
          <div className='queries-page-content-header'>
            <div className='new-query-btn' onClick={showModal}>
              New Query
            </div>
            <div className={'search-query-form'}>
              <Form.Item name={'searchQuery'}>
                <Input
                  placeholder='Search query'
                  allowClear
                  onKeyUp={(e) => handleSearchKeyUp(e)}
                />
              </Form.Item>
              {isDesktop ? (
                <Form.Item name={'sortQuery'}>
                  <Select
                    placeholder='Sort'
                    allowClear
                    onChange={handleSortOnChange}
                    className={'sort-query'}
                    style={{
                      width: 'fit-content',
                      minWidth: 80,
                    }}
                    dropdownMatchSelectWidth={false}
                    suffixIcon={
                      <Icon icon='gg:sort-az' style={{ fontSize: 20 }} />
                    }
                    placement={'bottomRight'}
                    optionLabelProp='label'
                  >
                    <Select.Option value='newest' label={'Sorted by: Newest'}>
                      <span>Newest</span>
                    </Select.Option>
                    <Select.Option value='oldest' label={'Sorted by: Oldest'}>
                      <span>Oldest</span>
                    </Select.Option>
                    <Select.Option
                      value='vote-asc'
                      label={'Sorted by: Vote Ascending'}
                    >
                      <span>Vote Ascending</span>
                    </Select.Option>
                    <Select.Option
                      value='vote-des'
                      label={'Sorted by: Vote Descending'}
                    >
                      <span>Vote Descending</span>
                    </Select.Option>
                  </Select>
                </Form.Item>
              ) : null}
            </div>
          </div>

          {isDesktop ? null : (
            <div className='query-by-filter-mobile'>
              <div
                className={`filter-mobile-item ${
                  searchParams.get('query') === 'all' ||
                  !searchParams.get('query')
                    ? 'active'
                    : null
                }`}
                onClick={() => handleNavigateQueryPage('all')}
              >
                All
              </div>
              <div
                className={`filter-mobile-item ${
                  searchParams.get('query') === 'my-queries' ? 'active' : null
                }`}
                onClick={() => handleNavigateQueryPage('my-queries')}
              >
                My Queries
              </div>
              <div
                className={`filter-mobile-item ${
                  searchParams.get('query') === 'saved-queries'
                    ? 'active'
                    : null
                }`}
                onClick={() => handleNavigateQueryPage('saved-queries')}
              >
                Saved queries
              </div>
            </div>
          )}

          {isDesktop ? null : (
            <div
              className='advanced-setting'
              onClick={() => setDrawerVisible(true)}
            >
              Advanced Setting <SettingOutlined />
            </div>
          )}

          <div className='queries-page-content-main'>
            <QueriesPageQuestionCard />
            <QueriesPageQuestionCard />
            <QueriesPageQuestionCard />
            <QueriesPageQuestionCard />
            <Pagination
              showSizeChanger
              onShowSizeChange={onShowSizeChange}
              defaultCurrent={1}
              total={500}
              className={'content-main-pagination'}
            />
          </div>
        </Col>
        {isDesktop ? (
          <Col className='queries-page-recommendation' lg={{ span: 5 }}>
            <div className='query-recommendation'>
              <b>Queries you may see</b>
              <Divider
                style={{
                  borderTopColor: '#1C1D1F',
                  color: '#1C1D1F',
                  margin: '12px 0',
                }}
              />
              <div className='recommend-query-list'>
                <div className='recommend-query'>
                  <FormOutlined />
                  <span className='recommend-query-title'>
                    Recommend title 1
                  </span>
                </div>
                <div className='recommend-query'>
                  <FormOutlined />
                  <span className='recommend-query-title'>
                    Recommend title 1
                  </span>
                </div>
                <div className='recommend-query'>
                  <FormOutlined />
                  <span className='recommend-query-title'>
                    Recommend title 1
                  </span>
                </div>
                <div className='recommend-query'>
                  <FormOutlined />
                  <span className='recommend-query-title'>
                    Recommend title long long long long long long long
                  </span>
                </div>
                <div className='recommend-query'>
                  <FormOutlined />
                  <span className='recommend-query-title'>
                    Recommend title 1
                  </span>
                </div>
              </div>
            </div>
          </Col>
        ) : null}
      </Row>

      {/* DRAWER in MOBILE RESPONSIVE */}
      <Drawer
        bodyStyle={{ padding: '30px 20px' }}
        headerStyle={{ paddingLeft: 10, fontWeight: 200 }}
        className='queries-page-drawer'
        title='Advanced Setting'
        placement={'bottom'}
        width={500}
        onClose={onDrawerClose}
        visible={drawerVisible}
        extra={
          <Space>
            <Button
              onClick={handleDrawerOk}
              style={{ background: '#ee834e', color: 'white', fontWeight: 600 }}
            >
              OK
            </Button>
          </Space>
        }
        closeIcon={null}
      >
        <Form.Item name={'sortQuery'} label={'Sort:'} labelCol={{ span: 24 }}>
          <Select
            placeholder='Sort'
            allowClear
            onChange={handleSortOnChange}
            className={'sort-query'}
            style={{
              width: '100%',
              minWidth: 80,
            }}
            dropdownMatchSelectWidth={false}
            suffixIcon={<Icon icon='gg:sort-az' style={{ fontSize: 20 }} />}
            placement={'bottomRight'}
            optionLabelProp='label'
          >
            <Select.Option value='newest' label={'Sorted by: Newest'}>
              <span>Newest</span>
            </Select.Option>
            <Select.Option value='oldest' label={'Sorted by: Oldest'}>
              <span>Oldest</span>
            </Select.Option>
            <Select.Option value='vote-asc' label={'Sorted by: Vote Ascending'}>
              <span>Vote Ascending</span>
            </Select.Option>
            <Select.Option
              value='vote-des'
              label={'Sorted by: Vote Descending'}
            >
              <span>Vote Descending</span>
            </Select.Option>
          </Select>
        </Form.Item>
        <TagsDropDown form={formSearch} label='Tags:' />
      </Drawer>
    </Form>
  );
};

export default QueriesPage;
