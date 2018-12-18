//src/components/DanhSachLoai.js
import React, { Component } from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import axios from 'axios';

export class DanhSachLoai extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [], keyword: ""
        };

        //gọi APi lấy data
        axios.get('api/loais')
            .then(result => {
                //lúc nào cũng lấy dữ liệu là result.data
                this.setState({ data: result.data });
            })
            .catch((ex) => {
                console.error(ex);
            });
        console.log(this.state.data);
    }
    fieldOnChange = sender => {
        let value = sender.target.value;
        this.setState({ keyword: value });
    }
    handleSearch = event => {
        event.preventDefault();
        //gọi APi lấy data
        axios.get(`api/Loais/Search/${this.state.keyword}`)
            .then(result => {
                //lúc nào cũng lấy dữ liệu là result.data
                this.setState({ data: result.data });
            })
            .catch((ex) => {
                console.error(ex);
            });
    }
    render() {
        //thành phần dữ liệu (có thể lấy từ apo)
        const data = [{
            maLoai: 1001, tenLoai: 'Bia',
            moTa: "Các loại bia", hinh: ""
        },
        {
            maLoai: 1002, tenLoai: 'Nước ngọt',
            moTa: "Các loại nước giải khát", hinh: ""
        }, {
            maLoai: 1003, tenLoai: 'Laptop',
            moTa: "DELL, HP, Sony, ASUS", hinh: "laptop.png"
        }, {
            maLoai: 1004, tenLoai: 'Tablet',
            moTa: "IPad, Samsung Tab, ASUS Memo", hinh: ""
        }];

        //định nghĩa cột hiển thị
        const columns = [{
            Header: 'Tên loại',//có thể format
            accessor: 'tenLoai' // tên field mapping
        }, {
            Header: 'Mã loại',
            accessor: 'maLoai',
            Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }, {
            Header: 'Mô tả', accessor: "moTa"
        }, {
                Header: 'Hình', accessor: "hinh",
                Cell: props => <img src={props.value} />
        }];

        return (
            <div>
                <h2>DANH SÁCH LOẠI</h2>
                <input name="search" value={this.state.keyword} onChange={this.fieldOnChange} />
                <button type="button" onClick={this.handleSearch}>Tìm</button>
                <ReactTable data={this.state.data} columns={columns}
                    defaultPageSize={2} />
            </div>
        );
    }
}