//HangHoaList
import React, { Component } from 'react';
import axios from 'axios';
import { HangHoa } from './HangHoa';

export class HangHoaList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            HangHoaData: [], gioHang: []
        }

        //đọc api gán dữ liệu
        axios.get("api/HangHoas")
            .then(result => {
                this.setState({ HangHoaData: result.data })
            })
            .catch(err => {
                console.log(`Lỗi: ${err}`);
            });        
    }//end construtor

    handleDetail = (id) => {
        console.log(`Đang chọn ${id}`);
    }
    handleAddToCart = hanghoa => {
        console.log(`Giỏ hàng: ${this.props.gioHang}`);
        var cart = this.state.gioHang;        
        cart.push(hanghoa);
        this.setState({ gioHang: cart });
        console.log(`Giỏ hàng: ${this.props.gioHang}`);
    }
    render() {
        return (
            <div>
                <h2>Danh sách Hàng hóa</h2>
                <div className="row">
                    {this.state.HangHoaData.map(hanghoa => {
                        return (
                            <HangHoa key={hanghoa.maHh} hangHoaInfo={hanghoa} handleDetail={this.handleDetail}
                                cart={this.handleAddToCart}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }
}