import React from 'react';
import './index.scss';
import { Alert, Table } from 'antd';
import { getTableData, deleteByUserName } from './service';
import debounce from '@utils/debounce';
import moment from 'moment';

interface backDada {
  list: Array<any>;
  title: Array<any>;
}
class userSque extends React.Component {
  state = {
    dataSource: [],
    columns: [],
    page: 0,
    size: 20,
    total: undefined,
    loading: false,
    hasMore: true,
  };
  getTableData = () => {
    const { page, size } = this.state;
    this.setState({ loading: true });
    getTableData({ page, size })
      .then((data: backDada) => {
        const { list, title, totalItems } = data.data;
        title.length &&
          list.length &&
          this.setState(
            state => ({
              dataSource: [...state.dataSource, ...list],
              columns: title,
              total: totalItems,
              loading: false,
              page: state.page + 1,
            }),
            () => {
              console.log(this.state);
            },
          );
      })
      .catch((error: Error) => {
        throw error;
      })
      .finally(() => {
        this.setState({ loading: false });
        console.log('this is get Table Data ...');
      });
  };
  getColumn = (columns: any) => {
    const processedColumns = [
      ...columns.map((column: object) => {
        column.key = column.id;
        if (column.dataIndex == 'id') {
          column.sorter = (a, b) => a.id - b.id; // if you need server side sort set it to true
          column.defaultSortOrder = 'descend';
          column.sortDirections = ['descend', 'ascend'];
        }
        column.render = (text: string | null, record: any) => {
          if (column.dataIndex == 'published') {
            return text ? 'yes' : 'no';
          }
          if (/edAt/.test(column.dataIndex)) {
            return moment(text).format('YYYY-MM-DD');
          }
          return text;
        };
        column.align = 'center';
        column.eli;
        return column;
      }),
    ];
    return [...processedColumns];
  };
  componentDidMount() {
    const collDownGetTableData = debounce(this.getTableData, 1000);
    let tableBody = document.querySelector('.ant-table-body');
    let noMoreNode = document
      .createRange()
      .createContextualFragment(
        '<div style="text-align: center;">-you have reached the end-</div>',
      );
    tableBody.onscroll = e => {
      e.preventDefault();
      const { scrollTop, offsetHeight, scrollHeight } = e.target;
      const { dataSource, total } = this.state;
      if (offsetHeight + scrollTop + 20 > scrollHeight) {
        if (dataSource.length >= total) {
          this.setState({ hasMore: false });
          tableBody && tableBody.appendChild(noMoreNode);
          return;
        }
        collDownGetTableData();
      }
    };
    this.getTableData();
  }
  handleTableChange = (pagination, filters, sorter, extra) => {};
  render() {
    const { dataSource, columns, loading, hasMore } = this.state;
    return (
      <div className="user_sque">
        <Alert message="That's user sque is" type="success" />
        <Table
          dataSource={dataSource}
          columns={this.getColumn(columns)}
          onChange={this.handleTableChange}
          rowKey={'id'}
          scroll={{ x: '70vw', y: '74vh', scrollToFirstRowOnChange: true }}
          loading={loading}
          pagination={false}
        />
        {/* {!hasMore && <div className="no_more">-you have reached the end-</div>} */}
      </div>
    );
  }
}
export default userSque;
