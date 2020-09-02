import React from 'react';
import './index.scss';
import { Layout, Table, Alert, message } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import { getTableData, deleteByUserName } from './service';

interface backDada {
  list: Array<any>;
  title: Array<any>;
}
class Home extends React.Component {
  state = {
    dataSource: [],
    columns: [],
  };
  getTableData = () => {
    getTableData({})
      .then((data: backDada) => {
        console.log(data);
        const { list, title } = data.data;
        this.setState({
          dataSource: list,
          columns: title,
        });
      })
      .catch((error: Error) => {
        throw error;
      })
      .finally(() => {
        console.log('this is get Table Data ...');
      });
  };
  getColumn = (columns: any) => {
    const processedColumns = [
      ...columns.map((column, index) => {
        column.key = index;
        return column;
      }),
    ];
    const operation = {
      title: 'operation',
      dataIndex: 'operation',
      key: 'operation',
      render: (text: string, record: object, index: number) => {
        console.log(text, record, index);
        return (
          <div>
            <a onClick={() => this.delete(record.userName)}>delete</a>
          </div>
        );
      },
    };
    console.log(processedColumns);
    return [...processedColumns, operation];
  };
  delete = (userName: string) => {
    console.log(userName);
    deleteByUserName(userName).then(data => {
      console.log(data);
      if (data.code == 200000) {
        this.getTableData();
      }
    });
  };
  componentDidMount() {
    this.getTableData();
  }
  handleTableChange = (pagination, filters, sorter, extra) => {
    console.log('table change...');
  };
  render() {
    const { dataSource, columns } = this.state;
    return (
      <div>
        <Alert message="That's home is" type="success" />
        <Table
          dataSource={dataSource}
          columns={this.getColumn(columns)}
          onChange={this.handleTableChange}
          rowKey={'id'}
        />
      </div>
    );
  }
}
export default Home;
